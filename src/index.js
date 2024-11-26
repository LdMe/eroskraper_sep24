import ProductController from "./controllers/product/productController.js";

const productController = new ProductController();
const products = await productController.scrapProducts("Vermouth");
console.log(products);