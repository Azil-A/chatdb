var http = require('http');
const path = require('path');
var url = require('url');
const fs  = require('fs');
const { channel } = require('diagnostics_channel');


server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true);
res.setHeader('Content-Type','text/html');
if(req.url ==='/chat'){
    fs.readFile('file.txt',(err,data) => {
        
        let chat = data.toString();
        let chats = chat.split(',');
        res.end((chats.toString()));
    })
    
}

else if(parsedUrl.pathname == '/send'){

    
    const name = parsedUrl.query.name;
    const message =  parsedUrl.query.message;

    console.log(`${name} : ${message}`);

    // message = req.url.slice(1);
    // console.log(message);
    fs.appendFile('file.txt',` ${name} : ${message},`,(err)=>{});
    // fs.appendFile('file.txt',`\n${message}`,(err)=>{

    // })
    res.end('<h1>message saved to file</h1>');
}

}).listen(3000,()=>{
    console.log('server is running');
});