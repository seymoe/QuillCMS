import siteConf from './index.default'

export default {
  /** 管理端 ----------------- */

  // 分类相关
  categoryList: `${siteConf.api_url}/server${siteConf.api_path}/category/list`,
  categoryAdd: `${siteConf.api_url}/server${siteConf.api_path}/category/new`,
  categoryDelete: `${siteConf.api_url}/server${siteConf.api_path}/category`,

  // 标签相关
  tagList: `${siteConf.api_url}/server${siteConf.api_path}/tag/list`,
  tagAdd: `${siteConf.api_url}/server${siteConf.api_path}/tag/new`,
  tagDelete: `${siteConf.api_url}/server${siteConf.api_path}/tag`,

  // 文章相关
  postAdd: `${siteConf.api_url}/server${siteConf.api_path}/post/new`,
  postList: `${siteConf.api_url}/server${siteConf.api_path}/post/list`,
  postDelete: `${siteConf.api_url}/server${siteConf.api_path}/post`,
  uploadImage: `${siteConf.api_url}/server${siteConf.api_path}/upload`,

  // 用户相关
  userLogin: `${siteConf.api_url}/server${siteConf.api_path}/user/login`,
  userLogout: `${siteConf.api_url}/server${siteConf.api_path}/user/logout`,
  userList: `${siteConf.api_url}/server${siteConf.api_path}/user/list`,
  userAdd: `${siteConf.api_url}/server${siteConf.api_path}/user/new`,
  userDelete: `${siteConf.api_url}/server${siteConf.api_path}/user`,

  /** 客户端 ------------------ */
  topMenu: `${siteConf.api_url}/client${siteConf.api_path}/category/list`,

  // 文章列表
  appPostList: `${siteConf.api_url}/client${siteConf.api_path}/post/list`,
  appPostDetail: `${siteConf.api_url}/client${siteConf.api_path}/post`,

  // 上传图片
  appUploadImage: `${siteConf.api_url}/client${siteConf.api_path}/upload`
}
