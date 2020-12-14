const { filterImageFromUrl, deletedLocalFiles } = require('./util/util')

async function routes (fastify, options) {
    fastify.get('/filteredimage', async(request, reply) => {
        let { imageURL } = request.query
        if (!imageURL) {
            return reply.status(400).send(`Invalid url or No url provided`)
        }
        filterImageFromUrl(imageURL).then(filteredpath => {
            reply.status(200).sendFile(filteredpath, () => {deletedLocalFiles[filteredpath]})})
    })
}

module.exports = routes