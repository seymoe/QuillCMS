import siteConf from './index.default'

export default {
  // 分类相关
  categoryList: `${siteConf.api_url}/server${siteConf.api_path}/category/list`,
  categoryAdd: `${siteConf.api_url}/server${siteConf.api_path}/category/new`,
  categoryDelete: `${siteConf.api_url}/server${siteConf.api_path}/category`,

  // 用户相关
  userLogin: `${siteConf.api_url}/server${siteConf.api_path}/user/login`,
  userLogout: `${siteConf.api_url}/server${siteConf.api_path}/user/logout`,
  userList: `${siteConf.api_url}/server${siteConf.api_path}/user/list`,
  userAdd: `${siteConf.api_url}/server${siteConf.api_path}/user/new`,
  userDelete: `${siteConf.api_url}/server${siteConf.api_path}/user`
}
