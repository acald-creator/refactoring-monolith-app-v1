const fs = require('fs')
import Jimp from 'jimp'

async function filterImageFromURL(inputUrl: string): Promise<string> {
    return new Promise(async resolve => {
        const photo = await Jimp.read(inputUrl)
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg'
        await photo.resize(256, 256).quality(60).grayscale().write(__dirname+outpath, (img)=>{ resolve(__dirname+outpath)
        })
    })
}

async function deleteLocalFiles(files: Array<string>) {
    for ( let file of files) {
        fs.unlinkSync(file)
    }
}