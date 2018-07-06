import siteConf from './site'

siteConf.api_url = siteConf.dev ? 'http://127.0.0.1:8080' : ''

export default {
  /** 管理端 ----------------- */

  // 数据总览
  dataPreview: `${siteConf.api_url}/server${siteConf.api_path}/data-preview`,

  // 分类相关
  categoryList: `${siteConf.api_url}/server${siteConf.api_path}/category/list`,
  categoryAdd: `${siteConf.api_url}/server${siteConf.api_path}/category/new`,
  categoryDelete: `${siteConf.api_url}/server${siteConf.api_path}/category`,
  categoryUpdate: `${siteConf.api_url}/server${siteConf.api_path}/category/update`,

  // 标签相关
  tagList: `${siteConf.api_url}/server${siteConf.api_path}/tag/list`,
  tagAdd: `${siteConf.api_url}/server${siteConf.api_path}/tag/new`,
  tagDelete: `${siteConf.api_url}/server${siteConf.api_path}/tag`,

  // 友情链接相关
  linkList: `${siteConf.api_url}/server${siteConf.api_path}/link/list`,
  linkAdd: `${siteConf.api_url}/server${siteConf.api_path}/link/new`,
  linkDelete: `${siteConf.api_url}/server${siteConf.api_path}/link`,
  linkUpdate: `${siteConf.api_url}/server${siteConf.api_path}/link/update`,

  // 广告相关
  adList: `${siteConf.api_url}/server${siteConf.api_path}/ads/list`,
  adAdd: `${siteConf.api_url}/server${siteConf.api_path}/ads/new`,
  adDelete: `${siteConf.api_url}/server${siteConf.api_path}/ads`,
  adUpdate: `${siteConf.api_url}/server${siteConf.api_path}/ads/update`,

  // 文章相关
  postAdd: `${siteConf.api_url}/server${siteConf.api_path}/post/new`,
  postUpdate: `${siteConf.api_url}/server${siteConf.api_path}/post/update`,
  postList: `${siteConf.api_url}/server${siteConf.api_path}/post/list`,
  postDelete: `${siteConf.api_url}/server${siteConf.api_path}/post`,
  uploadImage: `${siteConf.api_url}/server${siteConf.api_path}/upload`,

  // 评论相关
  commentUpdate: `${siteConf.api_url}/server${siteConf.api_path}/comments/update`,
  commentList: `${siteConf.api_url}/server${siteConf.api_path}/comments/list`,
  commentDelete: `${siteConf.api_url}/server${siteConf.api_path}/comments`,

  // 用户相关
  userLogin: `${siteConf.api_url}/server${siteConf.api_path}/user/login`,
  userLogout: `${siteConf.api_url}/server${siteConf.api_path}/user/logout`,
  userList: `${siteConf.api_url}/server${siteConf.api_path}/user/list`,
  userAdd: `${siteConf.api_url}/server${siteConf.api_path}/user/new`,
  userDelete: `${siteConf.api_url}/server${siteConf.api_path}/user`,
  userUpdate: `${siteConf.api_url}/server${siteConf.api_path}/user/update`,

  /** 客户端 ------------------------------------------------------------------- */
  topMenu: `${siteConf.api_url}/client${siteConf.api_path}/category/list`,
  friendLink: `${siteConf.api_url}/client${siteConf.api_path}/friendlinks`,

  // 广告
  advertisement: `${siteConf.api_url}/client${siteConf.api_path}/ads`,

  // 文章列表
  appPostList: `${siteConf.api_url}/client${siteConf.api_path}/post/list`,
  appPostDetail: `${siteConf.api_url}/client${siteConf.api_path}/post`,
  appPostNew: `${siteConf.api_url}/client${siteConf.api_path}/post/new`,

  // 文章标签
  appTagList: `${siteConf.api_url}/client${siteConf.api_path}/tag/list`,

  // 上传图片
  appUploadImage: `${siteConf.api_url}/client${siteConf.api_path}/upload`,

  // 会员登陆
  memberLogin: `${siteConf.api_url}/client${siteConf.api_path}/member/login`,
  memberLogout: `${siteConf.api_url}/client${siteConf.api_path}/member/logout`,
  memberRegist: `${siteConf.api_url}/client${siteConf.api_path}/member/regist`,
  member: `${siteConf.api_url}/client${siteConf.api_path}/member`,

  // 评论
  comments: `${siteConf.api_url}/client${siteConf.api_path}/comments`,
  commentNew: `${siteConf.api_url}/client${siteConf.api_path}/comments/new`,

  // 文章 喜欢,收藏
  appPostLike: `${siteConf.api_url}/client${siteConf.api_path}/post/like`,
  appPostCollect: `${siteConf.api_url}/client${siteConf.api_path}/post/collect`
}
