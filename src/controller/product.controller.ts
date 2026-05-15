import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { Products } from "../types/product.types";

export const productController = (req : IncomingMessage, res : ServerResponse) =>{

    //  /products ---> /products/1234
    const url = req?.url ;
    const method = req?.method ;

    //getting the id for the particular product information
    const urlParts = url?.split('/');
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;

    if(url === '/products' && method === 'GET'){

        const products = readProduct();  
        // [{}, {}, {}]
        
        res.writeHead(200, {
            'content-type' : 'application/json'
        })

        res.end(JSON.stringify({
            message : 'This is the product route', 
            data : products
        }))
    } else if(id !== null && method === 'GET'){

        const products = readProduct();
        const product = products.find((p : Products) => p.id === id)

        res.writeHead(200, {
            'content-type' : 'application/json'
        })

        res.end(JSON.stringify({
            message : 'Here we will be finding a particular product',
            data : product,
        
        }))
    }
}