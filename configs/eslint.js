module.exports = {
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'unicorn/no-process-exit': 'off',
        'no-console': 'off',
      },
    },
  ],
};
