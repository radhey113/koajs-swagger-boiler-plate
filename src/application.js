const uuid = require('uuid');

const log = require('./log');

const State = {
  shuttingDown: false,
  layers: new Map(),
};

setUpGracefulShutdown();

module.exports = {
  initializeLayer(layerId, { initialize, tearDown }) {
    if (State.shuttingDown) {
      return deny;
    }

    if (State.layers.has(layerId)) {
      throw new Error(`layer ${layerId} has already been initialized`);
    }

    State.layers.set(layerId, {
      layerId,
      promise: null,
      initialize,
      tearDown,
      activeCallbacks: new Map(),
    });

    return acquireLayer.bind(null, layerId);
  },

  isShuttingDownError,
};

async function acquireLayer(layerId, callback) {
  if (State.shuttingDown) {
    return deny();
  }

  const layer = State.layers.get(layerId);
  if (layer.promise) {
    return callback(await layer.promise);
  }

  const { initialize } = layer;
  layer.promise = initialize();

  try {
    const layerObject = await layer.promise;
    if (!callback) {
      return layerObject;
    }
    return invokeCallback(layerId, callback, layerObject);
  } catch (error) {
    log.error(`error acquiring item from ${layerId}: `, error);
    layer.promise = null;
    throw error;
  }
}

const shuttingDownMsg = 'application is shutting down';
async function deny() {
  throw new Error(shuttingDownMsg);
}

function isShuttingDownError(e) {
  return e instanceof Error && e.message.indexOf(shuttingDownMsg) !== -1;
}

function setUpGracefulShutdown() {
  process.on('SIGINT', () => shutDown('SIGINT'));
}

async function invokeCallback(layerId, callback, ...params) {
  const id = uuid.v4();

  try {
    const promise = callback(...params);
    State.layers.get(layerId).activeCallbacks.set(id, promise);
    return await promise;
  } finally {
    State.layers.get(layerId).activeCallbacks.delete(id);
  }
}

async function shutDown(signal) {
  if (State.shuttingDown) {
    return;
  }

  log.info(`${signal}: shutting down now...`);
  State.shuttingDown = true;

  for (const { promise, tearDown, layerId, activeCallbacks } of State.layers.values()) {
    log.info(`shutting down ${layerId}...`);

    if (!promise) {
      log.info(`${layerId} was not initialized, no shutdown needed`);
      continue;
    }

    const activeCallbackPromises = Array.from(activeCallbacks.values());
    if (activeCallbackPromises.length) {
      try {
        log.info(`${layerId}: awaiting ${activeCallbackPromises.length} operations in progress...`);
        await Promise.all(activeCallbackPromises);
        log.info(`${layerId}: all pending operations completed`);
      } catch (error) {
        log.error(`${layerId}: some pending operations failed: `, error);
      }
    }

    try {
      const layerObject = await promise;
      try {
        await tearDown(layerObject);
        log.info(`${layerId} shut down gracefully`);
      } catch (tearDownError) {
        log.error(`${layerId} shut down failed: `, tearDownError);
      }
    } catch (initError) {
      log.info(`${layerId} initialization failed before, no shutdown needed`);
    }
  }
}
