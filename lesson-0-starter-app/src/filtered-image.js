async function routes (fastify, options) {
    fastify.get('/filteredimage', async(request, reply) => {

        let { imageURL } = request.query

        if (!imageURL) {
            return reply.status(400).send(`Invalid url or No url provided`)
        }
    })
}

module.exports = routes