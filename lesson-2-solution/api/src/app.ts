import * as express from 'express'
import { Application } from 'express'

class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any }) {
        this.app = express.default()
        this.port = appInit.port

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public use() {
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:8100")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}`)
        })
    }
}

export default App