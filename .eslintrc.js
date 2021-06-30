module.exports = {
  rules: {
    'no-console': 'off',
    'no-new': 0,
    'global-require': 0,
  },
  globals: {
    fetch: false,
    document: false,
    window: false,
  },
  parser: '@babel/eslint-parser',
};
