import App from './app'
import * as bodyParser from 'body-parser'
import { sequelize } from "./config/sequelize";
import { V0MODELS } from "./controllers/model.index";
import AuthController from "./controllers/auth/auth.controller";
import UsersController from "./controllers/users/users.controller";
import FeedController from "./controllers/feed/feed.controller";
import loggerMiddleware from './middlewares/loggerMiddleware'

async () => {
    await sequelize.addModels(V0MODELS)
    await sequelize.sync()
}

const app = new App({
    port: 8080,
    controllers: [
        new AuthController(),
        new UsersController(),
        new FeedController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        loggerMiddleware
    ]
})

app.use()
app.listen()