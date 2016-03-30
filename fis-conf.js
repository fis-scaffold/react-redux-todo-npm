fis.set('project.files', '/index.html'); // 按需编译。

// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.ts', '.tsx']
});

fis.match('*.{ts,tsx}', {
  parser: fis.plugin('typescript'),
  rExt: '.js'
});

// 改用 npm 方案，而不是用 fis-components
fis.unhook('components');
fis.hook('node_modules');

// 设置成是模块化 js
fis.match('/{node_modules,modules}/**.{js,ts,tsx}', {
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
  .match('*.{js,ts,tsx}', {
    optimizer: fis.plugin('uglify-js')
  })

  .match('::package', {

    // 更多用法请参考： https://github.com/fex-team/fis3-packager-deps-pack
    packager: fis.plugin('deps-pack', {
      'pkg/index.js': /*当有多条时，请用数组*/[
        'modules/index.tsx',
        'modules/index.tsx:deps', // 以及其所有依赖
      ]
    })
  })
