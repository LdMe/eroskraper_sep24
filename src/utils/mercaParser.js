import {JSDOM} from "jsdom";

class Parser {
    constructor(html){
        this.html = html;
        this.dom = new JSDOM(this.html);
    }
    getCategory(){
        const element = this.dom.window.document.querySelector("h1.product-lineal-title");
        const text = element.textContent.trim();
        return text;
    }
    getProductListContainer(){
        const element = this.dom.window.document.getElementById("productListZone");
        return element;
    }
    getProductCards(productList){
        const cards = productList.querySelectorAll(".item-type-1:not(.criteoItem) .product-item.big-item");
        return cards;
    }
    getProductTitle(productCard){
        const titleElement = productCard.querySelector("h2.product-title");
        return titleElement.textContent.trim();
    }
    getProductImage(productCard){
        const imageElement = productCard.querySelector("div.product-image img");
        return imageElement.src; 
    }
    getProductPrice(productCard){
        const priceElement = productCard.querySelector(".price-offer-now");
        const price = priceElement.textContent.replace(",",".");
        return parseFloat(price);
    }
    getProductRating(productCard){
        const ratings = productCard.querySelectorAll(".star.checked");
        return ratings.length;
    }
    getProductReviews(productCard){
        const reviews = productCard.querySelector(".starbar").textContent.trim();
        return parseInt(reviews);
    }
    getProductPricePerKilo(productCard){
        const quantityPrice = productCard.querySelector(".quantity-price");
        if(!quantityPrice) {
            return null;
        }
        const quantityProduct = quantityPrice.querySelector(".quantity-product");
        if(quantityProduct && quantityProduct.textContent.includes("KILO")){
            const price = quantityPrice.querySelector(".price-product").textContent.replace("€","").trim().replace(",",".");
            return parseFloat(price);
        }
        return null;
    }
    getProductPricePerLiter(productCard){
        const quantityPrice = productCard.querySelector(".quantity-price");
        if(!quantityPrice) {
            return null;
        }
        const quantityProduct = quantityPrice.querySelector(".quantity-product");
        if(quantityProduct && quantityProduct.textContent.includes("LITRO")){
            const price = quantityPrice.querySelector(".price-product").textContent.replace("€","").trim().replace(",",".");
            return parseFloat(price);
        }
        return null;
    }
    getProduct(productCard){
        const product = {
            name : this.getProductTitle(productCard),
            image: this.getProductImage(productCard),
            rating: this.getProductRating(productCard),
            reviews: this.getProductReviews(productCard),
            price: this.getProductPrice(productCard),
            pricePerKilo: this.getProductPricePerKilo(productCard),
            pricePerLiter: this.getProductPricePerLiter(productCard)
        }
        return product;
    }
    getProducts(){
        const container = this.getProductListContainer();
        const cards = this.getProductCards(container);
        const products= [];
        for(const card of cards){
            products.push(this.getProduct(card));
        }
        return products;
    }
}

export default Parser;