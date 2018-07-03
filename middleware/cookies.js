import axios from 'axios'

// 解决服务端发送请求无法获得cookie的问题
export default function (ctx) {
  if (ctx.isServer) {
    axios.defaults.headers.common = {}
    Object.keys(ctx.req.headers).map((key) => {
      axios.defaults.headers.common[key] = ctx.req.headers[key]
    })
  }
}
