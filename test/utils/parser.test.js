
import exp from "constants";
import Parser from "../../src/utils/parser.js";
import fs from "fs";

describe("Tests del parser JSDOM",()=>{

    let parser;
    beforeAll(()=>{
        const html = fs.readFileSync("test/test.html");
        parser = new Parser(html);
    });
    test("Conseguir la categoría de productos",()=>{
        const category = "Olives and pickles";
        expect(parser.getCategory()).toEqual(category);
    });
    test("Conseguir el contenedor de productos",()=>{
        const element = parser.getProductListContainer();
        expect(element.innerHTML).toContain("pageNumber");
        expect(element.innerHTML).toContain("Aceitunas rellenas de anchoa ")
    });
    test("Conseguir las tarjetas de productos",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        expect(cards.length).toBe(20);
    });
    test("Conseguir el título del primer producto",()=>{
        const title= "Aceitunas rellenas de anchoa LA ESPAÑOLA, lata 160 g";
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        expect(parser.getProductTitle(cards[0])).toEqual(title);
    })
    test("Conseguir la imagen del primer producto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const image = "https://supermercado.eroski.es/images/25006719.jpg";
        expect(parser.getProductImage(cards[0])).toEqual(image);
    });
    test("Conseguir el precio del primer producto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const price = 2.40;
        expect(parser.getProductPrice(cards[0])).toEqual(price);
    })
    test("Conseguir el rating del primer producto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const rating = 3;
        expect(parser.getProductRating(cards[0])).toEqual(rating);
    })
    test("Conseguir las reviews del primer producto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const reviews = 10;
        expect(parser.getProductReviews(cards[0])).toEqual(reviews);
    })
    test("Conseguir precio por kilo del primer producto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const pricePerKilo = 15;
        expect(parser.getProductPricePerKilo(cards[0])).toEqual(pricePerKilo);
    })
    test("Conseguir precio por litro del segundo producto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const pricePerLiter = 25.60;
        expect(parser.getProductPricePerLiter(cards[1])).toEqual(pricePerLiter);
    }) 
    test("Conseguir un producto en formato objeto",()=>{
        const container = parser.getProductListContainer();
        const cards = parser.getProductCards(container);
        const product = parser.getProduct(cards[0]);
        expect(product.name).toEqual("Aceitunas rellenas de anchoa LA ESPAÑOLA, lata 160 g");
        expect(product.image).toEqual("https://supermercado.eroski.es/images/25006719.jpg");
        expect(product.price).toEqual(2.40);
        expect(product.rating).toEqual(3);
        expect(product.reviews).toEqual(10);
        expect(product.pricePerKilo).toEqual(15);
        expect(product.pricePerLiter).toEqual(null);

        const product2 = parser.getProduct(cards[1]);
        expect(product2.name).toEqual("Aceitunas rellenas suaves LA ESPAÑOLA, pack 3x50 g");
        expect(product2.image).toEqual("https://supermercado.eroski.es/images/4944799.jpg");
        expect(product2.price).toEqual(3.85);
        expect(product2.rating).toEqual(0);
        expect(product2.reviews).toEqual(1);
        expect(product2.pricePerKilo).toEqual(null);
        expect(product2.pricePerLiter).toEqual(25.60);

    })
    test("Conseguir array con todos los productos",()=>{
        const products = parser.getProducts();
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toBe(20);
        expect(typeof products[0]).toBe("object");
        const product = products[0];
        expect(product.name).toEqual("Aceitunas rellenas de anchoa LA ESPAÑOLA, lata 160 g");
        expect(product.image).toEqual("https://supermercado.eroski.es/images/25006719.jpg");
        expect(product.price).toEqual(2.40);
        expect(product.rating).toEqual(3);
        expect(product.reviews).toEqual(10);
        expect(product.pricePerKilo).toEqual(15);
        expect(product.pricePerLiter).toEqual(null);
    });
})