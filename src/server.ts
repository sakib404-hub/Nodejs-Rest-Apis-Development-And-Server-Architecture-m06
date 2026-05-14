import { createServer, IncomingMessage, Server } from "http";

const server : Server = createServer((req : IncomingMessage, res)=>{
    
    // console.log(req?.url);
    // console.log(req?.method); GET, POST, PATCH, DELETE

    const url = req?.url;
    const method = req?.method;

    if(url === '/' && method === 'GET'){
       res.writeHead( 200,{
        "content-type" : "application/json"
       })

       res.end(JSON.stringify({
        message : 'This is the root route'
       }));
    }else if(url?.startsWith('/products')){
        
        res.writeHead(200, {
            'content-type' : 'application/json'
        })

        res.end(JSON.stringify({message : 'This is the product route'}))
    } else{
          res.writeHead( 404,{
        "content-type" : "application/json"
       })

       res.end(JSON.stringify({
        message : 'Page not found!'
       }));
    }

})

server.listen(5015, ()=>{
    console.log('Server is runningg on port : 5015');
})