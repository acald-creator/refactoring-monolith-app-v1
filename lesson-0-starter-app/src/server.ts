import express from "express";
import bodyParser from "body-parser";
import { deleteLocalFiles, filterImageFromURL } from "./util/util";
const app = express()

const port = process.env.PORT || 8082

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send('Try "GET" /filteredimage?image={{}}')
})

app.get('/filteredimage', async(request, reply) => {
    let { imageURL } = request.query
    if (!imageURL) {
        return reply.status(400).send(`Invalid url or No url provided`)
    }

    // @ts-ignore
    filterImageFromURL(imageURL).then(filteredPath => {
        reply.status(200).sendFile(filteredPath, () => {
            // @ts-ignore
            return deleteLocalFiles(filteredPath)
        })
    })
})

app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log(`press CTRL+C to stop the server`)
})