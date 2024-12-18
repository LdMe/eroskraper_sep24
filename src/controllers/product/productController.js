import EroScraper from "../../utils/eroScraper.js";
import ErosParser from "../../utils/erosParser.js";
import Product from "../../models/productModel.js";
import Category from "../../models/categoryModel.js";

class ProductController{
    constructor(products=[]){
        this.products = [...products];
        this.LAST_PRODUCT_ID= this.products.length;
    }
    getAll(){
        return this.products;
    }
    
    getById(id){
        const product=  this.products.find(p=>p.id===id);
        if(!product){
            throw new Error("product not found");
        }
        return product;
    }
    
    create(data){
        const product = {
            ...data,
            id:++this.LAST_PRODUCT_ID
        }
        this.products.push(product);
        return product;
    }
    update(id,data){
        const product = this.getById(id);
        const updatedProduct = {...product,...data};
        const index = this.products.findIndex(p=> p.id===id);
        this.products.splice(index,1,updatedProduct);
        return updatedProduct;
    }
    
    remove(id){
        const index = this.products.findIndex(p=> p.id===id);
        if(index < 0){
            throw new Error("product to delete does not exist");
        }
        const removedProduct = this.products.splice(index,1);
        return removedProduct[0];
    }
    async scrapProducts(query){
        let category = await Category.findOne({name:query});
        if(!category){
            category = await Category.create({name:query});
        }
        const eroScraper =  new EroScraper();
        await eroScraper.init();
        const html = await eroScraper.search(query);
        const parser = new ErosParser(html);
        const products = parser.getProducts();
        const dbProducts = [];
        for(const product of products){
            product.category = category._id;
            const newProduct = await Product.create(product);
            dbProducts.push(newProduct);
        }
        category.products = [...category.products,...dbProducts.map(p=>p._id)];
        await category.save();
        return dbProducts;
    }
}



export default ProductController