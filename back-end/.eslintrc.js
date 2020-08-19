module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'graphql',
  ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    // 'graphql/named-operations': 'error',
    // 'graphql/capitalized-type-name': 'error',
    // 'graphql/no-deprecated-fields': 'error',
    // 'graphql/template-strings': ['off', { env: 'literal', tagName: 'gql' }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'import/prefer-default-export': 'off',
  },
};
