import * as express from 'express'
import { Request, Response } from 'express'
// @ts-ignore
import IControllerBase from 'interfaces/IControllerBase.interface'
import AuthController from "../auth/auth.controller";
import { User } from "../../models/Users";

class UsersController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
        this.router.get('/:id', this.authUser)
    }

    index = (req: Request, res: Response) => {
        return AuthController
    }

    authUser = async (req: Request, res: Response) => {
        let { id } = req.params
        const item = await User.findByPk(id)
        res.send(item)
    }
}

export default UsersController