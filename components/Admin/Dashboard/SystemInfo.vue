<template>
  <section class="system-info">
    <div class="infobox">
      <div class="box">
        <h3>系统信息</h3>
        <ul>
          <li>当前版本：QuillCMS v1.0</li>
          <li>中文名称：刺羽内容管理系统</li>
          <li>英文名称：QuillCMS</li>
        </ul>
      </div>
      <div class="box">
        <h3>技术支持</h3>
        <ul>
          <li>官网：<a href="#">暂无</a></li>
          <li>Q群：221745655</li>
          <li>邮箱：ximolang@yeah.net</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.system-info{
  margin-top: 30px;
  padding: 0 15px;
}
.infobox{
  display: flex;
  background-color: #fff;
  .box{
    width: 50%;
    box-sizing: border-box;
    padding: 15px;
    h3{
      margin: 0;
      font-size: 14px;
      color: #999;
    }
    ul{
      margin-top: 10px;
      li{
        border-bottom: 1px dashed #f8f8f8;
        line-height: 30px;
      }
    }
  }
}
</style>

