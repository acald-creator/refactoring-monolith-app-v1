import express from 'express'
import { sequelize } from 'express'
import { IndexRouter } from './controllers/v0/index.router'
import { V0MODELS } from './controllers/v0/model.index'

import bodyParser from 'body-parser'

(async () => {
    await sequelize.addModels(V0MODELS)
    await sequelize.sync()

    const app = express()
    const port = process.env.PORT || 8080

    app.use(bodyParser.json())

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8100')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizaiton')
        next()
    })

    app.use('/api/v0', IndexRouter)

    app.get('/', async (req, res) => {
        res.send('/api/v0')
    })

    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`)
        console.log(`press CTRL+C to stop server`)
    })

})