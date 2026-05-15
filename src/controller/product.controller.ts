import type { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../service/product.service";
import type { Products } from "../types/product.types";
import { parseBody } from "../utility/uitility";
import { sendResponse } from "../utility/sendResponse";

export const productController = async(req : IncomingMessage, res : ServerResponse) =>{

   try{
     //  /products ---> /products/1234
    const url = req?.url ;
    const method = req?.method ;

    //getting the id for the particular product information
    const urlParts = url?.split('/');
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;

    if(url === '/products' && method === 'GET'){
        // getting all the product from the database

        const products = readProduct();  
  
        sendResponse(res, 200, true, 'This is the product Information', products)
    } else if(id !== null && method === 'GET'){
        //Getting a single product from a databse

        const products = readProduct();
        const product = products.find((p : Products) => p.id === id)

        sendResponse(res, 200, true, 'Success Finding a particular information', product)
        
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
    }else if((method === 'PUT' || method === 'PATCH') &&  id !== null){

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
    }else if(method === 'DELETE' && id !== null){
        const products = readProduct();;

        const index = products.findIndex((p : Products)=> p.id === id)

        res.writeHead(200, {
            "content-type" : 'application/json'
        })

        if(index === -1){
            res.end(JSON.stringify({
                message : 'The Product is not found!'
            }))
        }else{
            const deletedProductInformation = products[index];
            products.splice(index, 1);
            writeProduct(products);

             res.end(JSON.stringify({
                message : 'The Product is deleted successfully!',
                data : deletedProductInformation
            }))
        }
    }
   }catch (error) {

        res.writeHead(500, {
            'content-type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Internal Server Error',
            error: String(error)
        }));
    }
}