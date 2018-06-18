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

  /* 七牛配置 */
  openqn: false, // 是否开启,若为true 则下面的信息必须配置正确完整
  accessKey: 'your accessKey',
  secretKey: 'your secretKey',
  bucket: 'quillcms', // 上传的目标资源空间
  origin: '', // cdn域名
  fsizeLimit: 1024 * 1024 * 5, // 上传文件大小限制默认为5M
  assetsCdn: true, // 静态资源使用cnd.请在build完成后将 elemt.*.js 上传的七牛的融合cdn

  /**
   * Cookie配置
   */
  secret: 'quillcms',
  resave: false,
  saveUninitialized: false,
  maxAge: 3600000
}
