module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest': true
  },
  'extends': ['airbnb', 'plugin:@typescript-eslint/recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'plugins': ['@typescript-eslint', 'jest', 'import'],
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  'rules': {
    "react/jsx-indent-props": [2, 4],
    "react/jsx-indent": [2, 4],
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }]
  }
};
