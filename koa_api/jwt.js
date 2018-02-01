const jwt = require('koa-jwt')
const SECRET = 'S3cRET~!'
const jwtInstance = jwt({secret: SECRET})

function JWTErrorHandler(ctx,next) {
  return next().catch((err) => {
    if(err.status == 401) {
      ctx.status = 401;
      ctx.body = {
        "error": 'Not authorized'
      }
    } else {
      throw err;
    }
  })
}

const jsonwebtoken = require('jsonwebtoken')

module.exports.issue = (payload) => {
  return jsonwebtoken.sign(payload, SECRET)
}
module.exports.jwt = () => jwtInstance
module.exports.errorHandler = () => JWTErrorHandler