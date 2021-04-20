module.exports = {
  extends: ['wesbos'],
  rules: {
    'no-restricted-globals': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        semi: false,
      },
    ],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'no-plusplus': 0,
    'react/button-has-type': 0,
  },
}
