## hapi
```js
const server = new Hapi.Server() //实例
server.connection({
  port,
  host,
}) //连接
server.route(Array) //路由
server.start() //启动
```

## Swagger 文档书写
## Joi 入参校验