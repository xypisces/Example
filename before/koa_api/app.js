const koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const ObjectId = require('mongodb').ObjectId
const jwt = require('./jwt')

const app = new koa()
const router = new Router()
const securedRouter = new Router()

require('./db/mongo')(app)

app.use(BodyParser())
app.use(logger())
// app.use(jwt.errorHandler()).use(jwt.jwt())
securedRouter.use(jwt.errorHandler()).use(jwt.jwt())

router.get('/', async (ctx)=>{ 
  ctx.body = {
    message: 'hello world!'
  }
})

router.get('/get', async (ctx)=>{
  let name = ctx.request.query.name || 'noname'
  ctx.body = {
    message: `your name is ${name}`,
    body: ctx.request.query
  }
})

router.post('/post', async (ctx)=>{
  let name = ctx.request.body.name || "World"
  ctx.body = {
    message: `your postname is ${name}`,
  }
})

//auth
router.post('/auth', async(ctx) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  if(username === 'user' && password === 'pwd') {
    ctx.body = {
      token: jwt.issue({
        user: 'user',
        role: 'admin'
      })
    }
  } else {
    ctx.status = 401
    ctx.body = {
      error: 'Invalid login'
    }
  }
})
//api
securedRouter.get('/people', async (ctx) => {
  ctx.body = await ctx.app.people.find().toArray()
})

router.post('/people', async (ctx) => {
  ctx.body = await ctx.app.people.insert(ctx.request.body)
})

router.get('/people/:id', async (ctx)=>{
  ctx.body = await ctx.app.people.findOne({"_id": ObjectId(ctx.params.id)})
})

router.put('/people/:id', async (ctx)=>{
  let documentQuery = { "_id": ObjectId(ctx.params.id) }; // Used to find the document
  let valuesToUpdate = ctx.request.body;
  ctx.body = await ctx.app.people.updateOne(documentQuery, valuesToUpdate);
})

router.delete("/people/:id", async (ctx) => {
  let documentQuery = { "_id": ObjectId(ctx.params.id) }; // Used to find the document
  ctx.body = await ctx.app.people.deleteOne(documentQuery);
});

app.use(router.routes()).use(router.allowedMethods())
app.use(securedRouter.routes()).use(securedRouter.allowedMethods())

app.listen(3333, ()=>{
  console.log('app is start at 3333')
})