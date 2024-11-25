

class CategoryController{

    constructor(categories){
        this.categories = categories;
        this.LAST_CATEGORY_ID=categories.length;
    }
    getAll(){
        return this.categories;
    }
    getById(id){
        const category= this.categories.find(c => c.id ===id);
        if(!category){
            throw new Error("category not found");
        }
        return category;
    }
    create(name){
        const newCategory = {
            id:++this.LAST_CATEGORY_ID,
            name
        };
        this.categories.push(newCategory);
        return newCategory;
    }
    update(id,name){
        const category = this.getById(id);
        category.name = name;
        return category;
    }
    remove(id){
        const index = this.categories.findIndex(c=>c.id===id);
        if(index <0){
            throw new Error("category not found");
        }
        const deletedCategory = this.categories.splice(index,1);
        return deletedCategory[0];
    }

}

export default CategoryController;