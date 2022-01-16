"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFiles = exports.filterImageFromURL = void 0;
const fs_1 = __importDefault(require("fs"));
const Jimp = require("jimp");
async function filterImageFromURL(inputUrl) {
    return new Promise(async (resolve) => {
        const photo = await Jimp.read(inputUrl);
        const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        await photo.resize(256, 256).quality(60).grayscale().write(__dirname + outpath, (img) => {
            resolve(__dirname + outpath);
        });
    });
}
exports.filterImageFromURL = filterImageFromURL;
async function deleteLocalFiles(files) {
    for (let file of files) {
        fs_1.default.unlinkSync(file);
    }
}
exports.deleteLocalFiles = deleteLocalFiles;
//# sourceMappingURL=util.js.map