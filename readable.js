import fs from 'fs';
import path from 'path';

const pathToFile = path.join('demo.txt');

const readableStream = fs.createReadStream(pathToFile,{encoding: 'utf-8'});

readableStream.on('data',(chunk)=>{
    console.log('New chunk received:',chunk);
})
readableStream.on('end',()=>{
    console.log('No more data to read.');
});
readableStream.on('error',(err)=>{
    console.error('Error while reading the file:',err);
});