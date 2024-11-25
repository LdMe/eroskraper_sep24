import ProductController from "../../src/controllers/product/productController.js";
import {products} from "../../src/utils/data/products.js";

describe("Tests de controlador de producto",()=>{
    let productController;
    beforeEach(()=>{
        productController = new ProductController(products);
    })
    test("Debería devolver todos los productos",()=>{
        const products = productController.getAll();
        expect( Array.isArray(products)).toBeTruthy();
        expect(products.length).toBe(3);
        expect(typeof products[0]).toBe("object");
    });
    test("Debería devolver un producto por id",()=>{
        const product = productController.getById(1);
        expect(typeof product).toBe("object");
        expect(product.name).toEqual("Jamón gran reserva del P. Vasco EROSKI, al corte, compra mínima 100 g");
        expect(product.image).toEqual("https://supermercado.eroski.es/images/22940290.jpg");
        expect(product.price).toEqual(2.09);
        expect(product.rating).toEqual(3);
        expect(product.reviews).toEqual(2);
        expect(product.pricePerKilo).toEqual(20.90);
        expect(()=>productController.getById(0)).toThrow();
    });

    test("Debería crear un producto",()=>{
        const product = productController.create({
            name:"Vermouth Rojo MARTINI, botella 1,5 litros",
            image: "https://supermercado.eroski.es/images/13927496.jpg",
            price: 12.99,
            rating:5,
            reviews:1,
            pricePerLiter:8.66
        });
        expect(typeof product).toBe("object");
        expect(product.name).toEqual("Vermouth Rojo MARTINI, botella 1,5 litros");
        expect(product.image).toEqual("https://supermercado.eroski.es/images/13927496.jpg");
        expect(product.price).toEqual(12.99);
        expect(product.rating).toEqual(5);
        expect(product.reviews).toEqual(1);
        expect(product.pricePerLiter).toEqual(8.66);
    });

    test("Debería actualizar un producto",()=>{
        const product = productController.update(1, {
            name:"Vermouth Rojo MARTINI, botella 1,5 litros",
            image: "https://supermercado.eroski.es/images/13927496.jpg",
            price: 12.99,
            rating:5,
            reviews:1,
            pricePerLiter:8.66
        });
        expect(typeof product).toBe("object");
        expect(product.name).toEqual("Vermouth Rojo MARTINI, botella 1,5 litros");
        expect(product.image).toEqual("https://supermercado.eroski.es/images/13927496.jpg");
        expect(product.price).toEqual(12.99);
        expect(product.rating).toEqual(5);
        expect(product.reviews).toEqual(1);
        expect(product.pricePerLiter).toEqual(8.66);
    });

    test("Debería borrar un producto",()=>{
        const product = productController.remove(1);
        expect(typeof product).toBe("object");
        expect(product.name).toEqual("Jamón gran reserva del P. Vasco EROSKI, al corte, compra mínima 100 g");
        expect(product.image).toEqual("https://supermercado.eroski.es/images/22940290.jpg");
        expect(product.price).toEqual(2.09);
        expect(product.rating).toEqual(3);
        expect(product.reviews).toEqual(2);
        expect(product.pricePerKilo).toEqual(20.90);
        expect(()=>productController.getById(1)).toThrow();
        expect(()=>productController.remove(0)).toThrow();
    });

})