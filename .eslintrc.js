module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  plugins: ['node', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
