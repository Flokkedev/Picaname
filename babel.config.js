module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset',
      '@babel/preset-typescript',
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-proposal-export-default-from',
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          regenerator: true,
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
