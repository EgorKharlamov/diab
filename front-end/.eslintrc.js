module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],

  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    'import/prefer-default-export': 'off',
    // 'import/no-default-export': 'error',
    'import/no-unresolved': 0,
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
};
