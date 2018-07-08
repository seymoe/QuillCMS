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
  host: '0.0.0.0',
  // 端口
  port: 8080,
  // API版本路径
  api_path: '/api/v1',
  // API URL地址
  api_url: '',

  /**
   * 后台设置
  */
  // 后台管理路径
  // !!! ⚠️ 在此配置路径之后，需要更改pages下对应的admin文件夹名称
  // 如果此配置路径深度大于一级，则pages下admin文件夹也要相应创建对应深度
  // 例： adminPath为 /quillcms/admin, 需要将pages下的admin文件夹更名为quillcms，并创建一个名为admin的子文件夹来盛放其他文件夹
  // 具体见 nuxt.js
  adminPath: '/quill_cms_admin',

  // 日志文件夹
  logDir: '/home/logsDir/quillcms',

  /**
   * 数据库配置
   */
  TEST_DB_URL: 'mongodb://127.0.0.1:27017/zhejingxuan',
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
  computerRoom: '华南', // 空间所在的机房
  origin: 'http://paktmj0gu.bkt.clouddn.com', // cdn域名
  fsizeLimit: 1024 * 1024 * 1, // 上传文件大小限制默认为1M
  assetsCdn: false, // 静态资源使用cnd.请在build完成后将 elemt.*.js 上传的七牛的融合cdn

  /**
   * Cookie配置
   */
  secret: 'quillcms',
  resave: false,
  saveUninitialized: false,
  maxAge: 1000 * 60 * 60 * 24,

  /**
   * 广告配置 id
   */
  indexAd: 'rJH_KzSfm'
}
