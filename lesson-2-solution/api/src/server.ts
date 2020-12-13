import App from './app'

import * as bodyParser from 'body-parser'

const app = new App({
    port: 8080,
    controllers: [

    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ]
})