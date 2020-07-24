/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 * 
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    es6: true,
    commonjs: true,
    browser: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  // https://github.com/yannickcr/eslint-plugin-react
  plugins: ['react', 'babel', 'promise'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'scripts/webpack.base.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'import/no-cycle': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'global-require': 0,
    'no-console': ["error", { allow: ["warn", "error"] }],
    'dot-notation': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'no-mixed-operators': 0,
    'no-return-await': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'no-restricted-globals': 0,
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    camelcase: 0,
    'max-len': [
      1,
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern:
          "^(\\s*[a-zA-Z_]+: '[^']+'[,;]*)|(.*require.*)$",
      },
    ],
    'import/prefer-default-export': 0,
    'no-eval': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'consistent-return': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'class-methods-use-this': 0,
    'no-nested-ternary': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': 0,
    'max-classes-per-file': 0,
    'prefer-promise-reject-errors': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  globals: {
    t: true,
    globals: true,
    request: true,
  },
}
