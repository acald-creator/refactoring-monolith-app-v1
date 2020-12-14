import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middlewares/logger'
import AuthController from "./controllers/auth/auth.controller";
import UsersController from "./controllers/users/users.controller";
import FeedController from "./controllers/feed/feed.controller";

const app = new App({
    port: 8080,
    controllers: [
        new AuthController(),
        new UsersController(),
        new FeedController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.use()
app.listen()