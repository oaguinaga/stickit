module.exports = {
  extends: ['wesbos'],
  rules: {
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
  },
}
