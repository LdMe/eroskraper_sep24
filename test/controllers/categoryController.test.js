import CategoryController from "../../src/controllers/category/categoryController.js";


describe("Test de categorías",()=>{
    let categoryController;
    beforeEach(()=>{
        const categories = [
            {
                id:1,
                name:"Frutas"
            },
            {
                id:2,
                name:"Verduras"
            },
            {
                id:3,
                name:"Carnes"
            },
            {
                id:4,
                name:"Lacteos"
            }
        ];
        categoryController =  new CategoryController(categories);
    });

    test("Debería devolver todas las categorías",()=>{
        const categories = categoryController.getAll();
        expect(Array.isArray(categories)).toBeTruthy();
        expect(categories.length).toBe(4);
        expect(typeof categories[0]).toBe("object");
    });
    test("Debería devolver una categoría por id",()=>{
        const category = categoryController.getById(1);
        expect(typeof category).toBe("object");
        expect(category.name).toEqual("Frutas");
        expect(()=>categoryController.getById(0)).toThrow();
    });
    test("Debería crear una nueva categoría",()=>{
        const category = categoryController.create("Pan");
        expect(typeof category).toBe("object");
        expect(category.name).toEqual("Pan");
    })
    test("Debería actualizar una categoría",()=>{
        const category = categoryController.update(1,"Tortillas");
        expect(typeof category).toBe("object");
        expect(category.name).toEqual("Tortillas");
    });
    test("Debería borrar una categoría",()=>{
        const category = categoryController.remove(1);
        expect(typeof category).toBe("object");
        expect(category.name).toEqual("Frutas");
        expect(()=>categoryController.remove(0)).toThrow();
    });
})