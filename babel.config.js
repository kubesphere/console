module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '2',
        useBuiltIns: 'entry',
        targets: ['> 5%', 'ie 9'],
        modules: 'commonjs',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'transform-imports',
      {
        lodash: {
          transform: 'lodash/${member}',
          preventFullImport: true,
        },
        'components/Base': {
          transform: 'components/Base/${member}',
          preventFullImport: true,
        },
        'components/Inputs': {
          transform: 'components/Inputs/${member}',
          preventFullImport: true,
        },
      },
    ],
    [
      '@pitrix/babel-plugin-lego-imports',
      {
        '@pitrix/lego-ui': {
          transform: 'defaultRule',
          preventFullImport: true,
        },
      },
    ],
    'recharts',
  ],
  env: {
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
            ignoreFilenames: ['node_modules'],
          },
        ],
      ],
    },
  },
}
