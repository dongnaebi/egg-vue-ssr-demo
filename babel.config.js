module.exports = function (api) {
  api.cache(true)
  return {
    'presets': [
      [
        '@babel/preset-env',
        {
          'modules': false
        }
      ]
    ],
    'plugins': [
      [
        '@babel/plugin-transform-runtime',
        {
          'corejs': false,
          'helpers': false,
          'regenerator': true,
          'useESModules': false
        }
      ],
      [
        'component',
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        }
      ],
      [
        'import',
        {
          'libraryName': 'ant-design-vue',
          'libraryDirectory': 'es',
          'style': 'css'
        },
        'ant-design-vue'
      ],
      [
        'import',
        {
          'libraryName': 'vant',
          'libraryDirectory': 'es',
          'style': true
        },
        'vant'
      ],
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties'
    ]
  }
}
