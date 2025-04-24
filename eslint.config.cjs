module.exports = {
  [
    {
      ...require('eslint-config-eslint').configs.recommended,
    }
    {
      ...require('eslint-plugin-react').configs.recommended,
    },
    {
      ...require('eslint-plugin-react-hooks').configs.recommended,
    },
    {
      ...require('@typescript-eslint/eslint-plugin').configs.recommended,
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules', 'dist'],
};
