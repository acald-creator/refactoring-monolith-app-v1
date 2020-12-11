import { FeedItem } from './feed/models/FeedItem'
import * as AWS from '../../aws'

const Router = require('@koa/router')
// Nested the routers together
// const feed = new Router()
// const users = new Router()
// const router = new Router()
const router: typeof Router = Router()
// Retrieve all items
router.get('/', async (ctx, next) => {
  const items = await FeedItem.findAndCountAll({
    order: [['id', 'DESC']]
  })
  items.rows.map((item) => {
    if (item.url) {
      item.url = AWS.getGetSignedUrl(item.url) // setup the aws config file @TODO
    }
  })
  next(items)
})
// Retrieve a specific source
router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params
  const item = await FeedItem.findByPk(id)
  next(item)
})
// Update a specific resource
router.patch('/:id', async (ctx, next) => {
  // @TODO Finish this section
  next()
})
// @TODO Setup the last section to use auth and signed url

// @TODO
// feed.user('/feed')
// @TODO
// users.user('/users')

export const IndexRouter: typeof Router = router
