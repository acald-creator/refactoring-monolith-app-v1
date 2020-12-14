const express = require('express');
const bodyParser = require('body-parser');

const app = express()

const port = process.env.PORT || 8082

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send('Try "GET" /filteredimage?image={{}}')
})

app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log(`press CTRL+C to stop the server`)
})