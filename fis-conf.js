fis.set('project.files', '/index.html'); // 按需编译。

// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.jsx']
});

fis.match('{/modules/**.js,*.jsx}', {
  // parser: fis.plugin('typescript'),
  
  // typescript 就是编译速度会很快，但是对一些 es7 的语法不支持，可以用 babel 来解决。用以下内容换掉 typescript 的parser配置就好了。
  parser: fis.plugin('babel-5.x', {
      sourceMaps: true,
      optional: ["es7.decorators", "es7.classProperties"]
  }),
  rExt: '.js'
});

// 改用 npm 方案，而不是用 fis-components
fis.hook('node_modules');

// 设置成是模块化 js
fis.match('/{node_modules,modules}/**.{js,jsx}', {
  isMod: true
});

fis.match('::package', {
  // 本项目为纯前段项目，所以用 loader 编译器加载，
  // 如果用后端运行时框架，请不要使用。
  postpackager: fis.plugin('loader', {
    useInlineMap: true
  })
});


// 请用 fis3 release production 来启用。
fis.media('production')

  // 对 js 做 uglify 压缩。
  .match('*.{js,jsx}', {
    optimizer: fis.plugin('uglify-js')
  })

  .match('::package', {

    // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
    packager: fis.plugin('deps-pack', {
      'pkg/index.js': /*当有多条时，请用数组*/[
        'modules/index.jsx',
        'modules/index.jsx:deps', // 以及其所有依赖
      ]
    })
  })
