import fs from "fs";

export default class ProductManager{
    constructor(){
        this.path = "./products.json";
        this.products = [];
    }

    addProduct = async (
        title,
        description,
        price,
        code,
        stock,
        thumbnail = "Not available" ) => {

        if (this.products.some((product) => product.code === code)) {
            return console.log(`The code ${code} already exists.`);
        } 

        const product = {
        id: this.generateId(),
        title: title,
        description: description,
        price: price,
        code: code,      
        stock: stock,
        thumbnail: thumbnail,
        };

        if(Object.values(product).includes(undefined)) {
            return console.log(`Please, complete all the information of the new product.`)
        } else {
            this.products.push(product);
        }

        await this.saveProductsToFile();
    }

    saveProductsToFile = async () => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
    
    generateId() {
        let id = 0;
    
        if (this.products.length === 0) {
        id = 1;
        } else {
        id = this.products[this.products.length - 1].id + 1;
        }
    
        return id;
    }

    getInfo = async () => {
        let response = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(response);
    }

    getProducts = async () => {
        let listOfProducts = await this.getInfo()
        return console.log(listOfProducts)
    }


    getProductByID = async (id) => {
        let response = await this.getInfo()
        let find = response.find((producto) => producto.id === id)
        !find ? console.log(`ID NUMBER ${id} NOT FOUND.`) : console.log(find)
    }

    deleteProduct = async (id) => {
        let products = await this.getInfo()

        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log(`Cannot delete product. Product with ID ${id} not found.`);
            return;
        }

        products.splice(index, 1);
    
        this.products = products;
        await this.saveProductsToFile();
        console.log(`Product ID ${id} deleted successfully!`);
    
    }
    
    updateProduct = async ({id, ...updatedFields}) => {
        let products = await this.getInfo();
        
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log(`Cannot update product. Product with ID ${id} not found.`);
            return;
        }

        Object.assign(products[index], updatedFields);
       
        this.products = products;
        await this.saveProductsToFile();        
        console.log("Product updated successfully!");
    }

    
}

//const eventManager = new ProductManager()

//Empty array
    //eventManager.getProducts()

//Add products ok
  /*
  eventManager.addProduct("Pencil", "Red color pencil", 200, 100, 20)
  eventManager.addProduct("Pencil", "Blue color pencil", 200, 101, 20)
  eventManager.addProduct("Pencil", "Yellow color pencil", 200, 102, 20)
  eventManager.addProduct("Pencil", "Green color pencil", 200, 103, 15)
  eventManager.addProduct("Pencil", "Orange color pencil", 200, 104, 15)
  eventManager.addProduct("Pencil", "Purple color pencil", 200, 105, 15)
  eventManager.addProduct("Pen", "Red color pen", 200, 106, 15)
  eventManager.addProduct("Pen", "Blue color pen", 200, 107, 30)
  eventManager.addProduct("Pen", "Green color pen", 200, 108, 15)
  eventManager.addProduct("Pen", "Purple color pen", 200, 109, 15)
  eventManager.addProduct("Pen", "Black color pen", 200, 110, 30)
  */

//Add products wrong
    //eventManager.addProduct("Pen", "Black color pen", 106,50)

//Add products repeated code
    //eventManager.addProduct("Pen", "Pink color pen", 300, 105,20)

 
//Search product by ID
    // eventManager.getProductByID(2)
    // eventManager.getProductByID(7)

/*
//Update product
    eventManager.updateProduct({
        id: 2,
        title: 'Higlighter',
        description: 'Orange color',
    })
*/
//Delete product by ID
    //eventManager.deleteProduct(9)
    //eventManager.deleteProduct(5)
