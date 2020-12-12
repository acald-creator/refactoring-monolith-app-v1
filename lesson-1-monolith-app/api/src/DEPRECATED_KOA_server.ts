import { sequelize } from './sequelize'
import { IndexRouter } from './controllers/v0/index.router'
import { V0MODELS } from './controllers/v0/model.index'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

(async () => {
  await sequelize.addModels(V0MODELS)
  await sequelize.sync()

  const app = new Koa()
  const port = process.env.PORT || 8080

  app.use(cors())

  app.use(bodyParser({
    detectJSON: function (ctx) {
      return /\.json$/i.test(ctx.path)
    }
  }))

  app.use('/api/v0', IndexRouter)

  app.use('/', async (ctx, next) => {
    next('/api/v0')
  })

  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log('press CTL+C to stop server')
  })
})()
