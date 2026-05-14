import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/routes";


const server : Server = createServer((req : IncomingMessage, res : ServerResponse)=>{
    
  routeHandler(req, res);

})

server.listen(5015, ()=>{
    console.log('Server is runningg on port : 5015');
})