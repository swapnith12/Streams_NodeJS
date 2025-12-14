import { Readable } from "stream";
import fs from 'fs'

// class CustomReadable extends Readable {
//     #count = 0
//     constructor(options){
//         super({...options});
//     }
//     _read(size) {
//         this.#count += 1;
//         if(this.#count<=5){
//             this.push(`Chunk number ${this.#count}\n`);
//         }
//     }
// }

// const myStream = new CustomReadable();
// myStream.on('data',(chunk)=>{
//     console.log('Received:',chunk.toString());
// })

class CustomReadableFile extends Readable {
   #filePath
   constructor(filePath,options={}){
    super(options)

    this.#filePath=fs.createReadStream(filePath,{encoding: 'utf-8',
        highWaterMark:options.highWaterMark || 64*1024
    });

    this.#filePath.on('data',(chunk)=>{
        if(!this.push(chunk)){
            this.#filePath.pause()
        }
    })
    this.#filePath.on('end',()=>{
        this.push(null)
    })
    this.#filePath.on('error',(err)=>{
        this.destroy(err)
    })
    this.on('drain',()=>{
        this.#filePath.resume()
    })
   }
   _read(){
    this.#filePath.resume()
   }
}

const stream = new CustomReadableFile('demo.txt');

stream.on('data',(chunck)=>{
    console.log(chunck.toString());    
})