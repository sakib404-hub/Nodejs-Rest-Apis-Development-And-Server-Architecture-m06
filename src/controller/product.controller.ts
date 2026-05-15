import type { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../service/product.service";
import type { Products } from "../types/product.types";
import { parseBody } from "../utility/uitility";

export const productController = async(req : IncomingMessage, res : ServerResponse) =>{

    //  /products ---> /products/1234
    const url = req?.url ;
    const method = req?.method ;

    //getting the id for the particular product information
    const urlParts = url?.split('/');
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;

    if(url === '/products' && method === 'GET'){
        // getting all the product from the database

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
        //Getting a single product from a databse

        const products = readProduct();
        const product = products.find((p : Products) => p.id === id)

        res.writeHead(200, {
            'content-type' : 'application/json'
        })

        res.end(JSON.stringify({
            message : 'Here we will be finding a particular product',
            data : product,
        
        }))
    }else if(method === 'POST' && url === '/products'){
        //? posting a product information
        const body = await parseBody(req)

        const newProduct : Products = {
            ...body,
            date : new Date()
        }

        const products = readProduct();
        products.push(newProduct);
        writeProduct(products);

        res.writeHead(200, {
            'content-type' : 'application/json'
        })

        res.end(JSON.stringify({
            message : 'We have successfully posted a data',
            data : newProduct
        }))
    }else if((method === 'PUT' || 'PATCH') &&  id !== null){

        //? modifying a product information

        const body = await parseBody(req);
        const products = readProduct();

        // getting the index of the product
        const index = products.findIndex((p : Products)=> p.id === id)
        // console.log(products[index]);

         res.writeHead(200, {
            'content-type' : 'application/json'  
        })

        if(index === -1){
            res.end(JSON.stringify({
                message : 'Product not found'
            }));
        }else{
            //updating the product information
            products[index] = {
                id : products[index].id,
                ...body
            }
            //updating the json database
            writeProduct(products);

             res.end(JSON.stringify({
            message : 'The operation is successfull, product updated successfully!',
            data : products[index]
        }))
        }
    }
}