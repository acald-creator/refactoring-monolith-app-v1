import * as express from 'express'
import * as AWS from '../../config/aws'
import { Request, Response } from 'express'
// @ts-ignore
import IControllerBase from 'interfaces/IControllerBase.interface'
import { FeedItem } from "../../models/FeedItem";
import { requireAuth } from "../auth/auth.controller";

class FeedController implements IControllerBase {
    public path = '/feed'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
        this.router.get('/:id', this.getItem)
        this.router.get('/:id', this.updateItem, requireAuth)
        this.router.get('/signed-url/:filename', this.signedUrl, requireAuth)
    }

    index = async (req: Request, res: Response) => {
        const items = await FeedItem.findAndCountAll({
            order: [['id', 'DESC']]
        })

        items.row.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url)
            }
        })
        res.send(items)
    }

    getItem = async (req: Request, res: Response) => {
        let { id } = req.params
        const item = await FeedItem.findByPk(id)
        res.send(item)
    }

    updateItem = async (req: Request, res: Response) => {
        res.send(500).send('Not implemented')
    }

    signedUrl = async (req: Request, res: Response) => {
        let { fileName } = req.params
        const url = AWS.getPutSignedUrl(fileName)
        res.status(201).send({ url: url})
    }
}

export default FeedController