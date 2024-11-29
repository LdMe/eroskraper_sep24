import ProductController from "./controllers/product/productController.js";
import { connectDB } from "./config/mongoose.js";
import Category from "./models/categoryModel.js";


async function main(){
    await connectDB();
    const productController = new ProductController();
    const products = await productController.scrapProducts("hielo");
    console.log(products);
}

async function getProductsByCategory(categoryName){
    await connectDB();
    const category = await Category.findOne({name:categoryName});
    if(!category){
        throw new Error("category not found");
    }
    await category.populate("products");
    console.log(category.products);
    return category.products;
}
//main();
getProductsByCategory("hielo");