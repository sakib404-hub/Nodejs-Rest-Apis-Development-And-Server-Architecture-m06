import type { IncomingMessage, ServerResponse } from "http";

export const productController = (req : IncomingMessage, res : ServerResponse) =>{
    
    const url = req?.url ;
    const method = req?.method ;

    if(url === '/products' && method === 'GET'){

        const products = {
            id : 1,
            name : 'Product - 1',
            price : 500
        }
        
        res.writeHead(200, {
            'content-type' : 'application/json'
        })

        res.end(JSON.stringify({
            message : 'This is the product route', 
            data : products
        }))
    }
}