module.exports = {
  extends: [
    'stylelint-config-html',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: [
        '**/*.vue',
        '**/*.css',
      ],
      rules: {
        // Disable the following rules
        'custom-property-no-missing-var-function': null,
        'no-descending-specificity': null,
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants'], // SCSS support if you're using SCSS
          },
        ],
      },
    },
  ],
  plugins: ['stylelint-order'],
  rules: { 'order/properties-alphabetical-order': true },
}
