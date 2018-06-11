export default {
  /**
   * 站点基本信息配置
   */

  // 是否是开发环境
  dev: (process.env.NODE_ENV !== 'production'),

  // 站点名称
  name: 'QuillCMS',
  // 站点描述
  description: 'QuillCMS, A Content Management System build with Node.js, Express, Nuxt.js and MongoDB.',
  // 站点关键词
  keywords: 'QuillCMS,CMS',
  // 站点域名
  host: '127.0.0.1',
  // 端口
  port: 4000,
  // API版本路径
  api_path: '/api/v1',
  // API URL地址
  api_url: 'http://127.0.0.1:4000',

  /**
   * 数据库配置
   */
  DB_URL: 'mongodb://127.0.0.1:27017/zhejingxuan',
  DB_NAME: 'quillcms',
  DB_HOST: '127.0.0.1',
  DB_PORT: 27017,
  DB_USERNAME: 'quillcms',
  DB_PASSWORD: 'quillcms',

  /**
   * Cookie配置
   */
  secret: 'quillcms',
  resave: false,
  saveUninitialized: false,
  maxAge: 60000
}
