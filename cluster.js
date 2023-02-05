const cluster = require("node:cluster")
const http = require("node:http")
const OS = require("node:os")

console.log(OS.cpus().length)
if(cluster.isMaster){
    console.log(`Master process ${process.pid} is running`)
    cluster.fork()
    cluster.fork()
}
else{
    console.log(`worker ${process.pid} started`)
    const server=http.createServer((req, res)=>{
  
        if(req.url==="/"){
         res.writeHead(200,{"Content-Type":"text/html"})
         res.end("Home Page");
        }
        else if(req.url==="/about"){
         res.writeHead(200,{"Content-Type":"text/html"})
         res.end("about page")
        }
        else{
         res.writeHead(404);
         res.end("Page not Found")
        }
     });
     server.listen(3000,()=>{
         console.log("server running on port 3000")
     })
}