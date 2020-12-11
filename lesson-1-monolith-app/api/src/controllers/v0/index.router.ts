const Router = require('@koa/router')
// Nested the routers together
const feed = new Router()
const users = new Router()
const router = new Router()

feed.user('/feed')
users.user('/users')
router.get('/')