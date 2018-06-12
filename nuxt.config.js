const conf = {
  // 站点名称
  name: 'QuillCMS',
  // 站点描述
  description: 'QuillCMS, A Content Management System build with Node.js, Express, Nuxt.js and MongoDB.',
  // 站点关键词
  keywords: 'QuillCMS,CMS'
}

module.exports = {
  // 是否为开发环境
  dev: (process.env.NODE_ENV !== 'production'),

  cache: false,
  /*
  ** Headers of the page
  */
  head: {
    title: conf.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: conf.description },
      { hid: 'keywords', name: 'keywords', content: conf.keywords }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    {
      src: '~plugins/element-ui',
      ssr: true
    },
    {
      src: '~plugins/axios',
      ssr: false
    }
  ],

  // babel: {        //配置按需引入规则
  //   "plugins": [
  //     [
  //       "component",
  //       {
  //         "libraryName": "element-ui",
  //         "styleLibraryName": "theme-chalk"
  //       }
  //     ]
  //   ]
  // },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '~/assets/css/main.css',
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'element-ui'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  router: {
    middleware: 'adminAuth'
  },
}
