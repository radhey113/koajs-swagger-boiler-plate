const path = require('path');
const cmd = require('node-cmd');
const SSH = require('node-ssh');

const log = require('../log');
const {
  PORT,
  STAGING_SSH_HOST,
  STAGING_SSH_PORT,
  STAGING_SSH_USERNAME,
  STAGING_SSH_PASSWORD,
  DOCKER_USER,
  DOCKER_IMAGE_NAME,
  DOCKER_REGISTRY,
} = require('../conf');

const imageName = `${DOCKER_REGISTRY}/${DOCKER_USER}/${DOCKER_IMAGE_NAME}`;
const repoDirname = path.resolve(__dirname, '../../');
const containerName = DOCKER_IMAGE_NAME;

deploy()
  .then(() => log.info('The app was deployed successfully!'))
  .catch(err => log.error('Deploy error:', err));

async function deploy() {
  log.info('building the image');
  await run(`docker build -t ${imageName} ${repoDirname}`);
  log.info('the image was built successfully');

  log.info('pushing the image');
  await run(`docker push ${imageName}`);
  log.info('the image was pushed successfully');

  log.info('run image');
  await runAppInTheRemoteServer();
  log.info('the image is running');
}

async function runAppInTheRemoteServer() {
  const ssh = new SSH();

  log.info('login to the remote server');
  await ssh.connect({
    host: STAGING_SSH_HOST,
    port: STAGING_SSH_PORT,
    username: STAGING_SSH_USERNAME,
    password: STAGING_SSH_PASSWORD,
  });

  log.info('stop and remove container');
  await ssh.execCommand(`docker stop ${containerName} && docker rm -v ${containerName}`, {
    onStdout,
    onStderr,
  });

  log.info('remove image');
  await ssh.execCommand(`docker rmi ${imageName}`, { onStdout, onStderr });

  log.info('run container');
  await ssh.execCommand(`docker run -d --name ${containerName} -p ${PORT}:${PORT} ${imageName}`, {
    onStdout,
    onStderr,
  });

  ssh.dispose();
}

function run(command) {
  return new Promise(resolve => {
    const res = cmd.run(command);
    res.stdout.pipe(process.stdout);
    res.stdout.on('end', () => {
      resolve();
    });
  });
}

function onStdout(data) {
  log.info(data.toString('utf8'));
}

function onStderr(data) {
  log.error(data.toString('utf8'));
}
