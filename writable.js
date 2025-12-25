import fs from 'fs'
import path from 'path';

const pathToFile = path.join('demo.txt');

const readableStream = fs.createReadStream(pathToFile,{encoding: 'utf-8'});

const writableStream = fs.createWriteStream('copy_of_output.txt',{encoding: 'utf-8'});
// pipe the readable stream to the writable stream use pipe() or manually handle backpressure

readableStream.pipe(writableStream);

writableStream.on('finish',()=>{
    console.log('All data has been written to copy_of_output.txt');
})

writableStream.on('error',(err)=>{
    console.error('Error while writing to the file:',err);
});

writableStream.on('drain',()=>{
    console.log('Writable stream drained, resuming readable stream.');
    readableStream.resume();
});
//no need above if pipe used 
// it does below code 
// readable.on("data", (chunk) => {
//   if (!writable.write(chunk)) {
//     readable.pause();
//   }
// });

// writable.on("drain", () => {
//   readable.resume();
// });