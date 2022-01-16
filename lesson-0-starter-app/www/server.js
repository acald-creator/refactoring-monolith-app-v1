"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const app = (0, express_1.default)();
const port = process.env.PORT || 8082;
app.use(body_parser_1.default.json());
app.get('/', async (req, res) => {
    res.send('Try "GET" /filteredimage?image={{}}');
});
app.get('/filteredimage', async (request, reply) => {
    let { imageURL } = request.query;
    if (!imageURL) {
        return reply.status(400).send(`Invalid url or No url provided`);
    }
    // @ts-ignore
    (0, util_1.filterImageFromURL)(imageURL).then(filteredPath => {
        reply.status(200).sendFile(filteredPath, () => {
            // @ts-ignore
            return (0, util_1.deleteLocalFiles)(filteredPath);
        });
    });
});
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop the server`);
});
//# sourceMappingURL=server.js.map