import Hapi from '@hapi/hapi'
import { sequelize } from './sequelize'
import { V0MODELS } from './controllers/v0/model.index'

const dotenv = require('dotenv')

dotenv.config()

const init = async () => {
  await sequelize.authenticate().then(() => {
    console.log('Success!')
  }).catch((err) => {
    console.log(err)
  })

  await sequelize.addModels(V0MODELS)
  await sequelize.sync()

  const hostname = 'localhost'

  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: hostname
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      h.send('/api/v0')
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

init()
