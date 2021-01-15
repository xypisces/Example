const GROUP_NAME = 'order'
const Joi = require('joi')
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req,res) => {
      res({
        code: 200,
        value: 'hello hapi'
      })
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试hello-hapi',
    },
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{orderId}`,
    handler: (req,res) => {
      res({
        code: 200,
        value: 'hello order'
      })
    },
    config: {
      tags: ['api', 'order'],
      description: '测试hello-order',
      validate: {
        params: {  //动态路由param校验
          orderId: Joi.string().required(),
        },
        payload:{ //post数据的校验
          goodsList: Joi.array().items(
            Joi.object().keys({
              goods_id: Joi.number().integer(),
              count: Joi.number().integer(),
            })
          )
        },
        query: { //适用于 GET 接口的 query
          limit: Joi.number().integer().min(1).default(10)
            .description('每页的条目数'),
          page: Joi.number().integer().min(1).default(1)
            .description('页码数'),
        },
        headers: Joi.object({ //适用于 header 额外字段约束的 headers 验证
          authorization: Joi.string().required(),
        }).unknown(),
      }
    },
  },
]