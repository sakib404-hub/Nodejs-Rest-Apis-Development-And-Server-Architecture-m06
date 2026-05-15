import path from "path";
import fs from 'fs'
import type { Products } from "../types/product.types";


export const readProduct = () => {
    
    const filePath = path.join(process.cwd(), './src/database/db.json')
    // console.log(filePath);


    const products = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(products);
}

export const writeProduct = (product : any) =>{

    const filePath = path.join(process.cwd(), './src/database/db.json');
    fs.writeFileSync(filePath, JSON.stringify(product))
}