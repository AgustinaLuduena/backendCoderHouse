class ProductManager{
    constructor(){
      this.products = []
    }

    getProducts = () => this.products;

    addProduct(
        title,
        description,
        price,
        code,
        stock,
        thumbnail = "Not available" ) {
    
        const product = {
        id: this.generateId(),
        title: title,
        description: description,
        price: price,
        code: code,      
        stock: stock,
        thumbnail: thumbnail,
        };

        if (this.products.some((product) => product.code === code)) {
            return console.log(`The code ${code} already exists.`);
        } else if(Object.values(product).includes(undefined)) {
            return console.log(`Please, complete all the information of the new product.`)
        } else {
            this.products = [ ...this.products, product]
        }
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

    existingProduct (id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductByID(id) {
        !this.existingProduct(id) ? console.log(`ID NUMBER ${id} NOT FOUND.`) : console.log(this.existingProduct(id))
    }
}

const eventManager = new ProductManager()

//Empty array
console.log(eventManager.getProducts())

//Add products ok
eventManager.addProduct("Pencil", "Red color pencil", 200, 100, 15)
eventManager.addProduct("Pencil", "Blue color pencil", 200, 101, 15)
eventManager.addProduct("Pen", "Green color pen", 300, 102,50)
console.log(eventManager.getProducts())

//Add products wrong
eventManager.addProduct("Pen", "Black color pen", 103,50)

//Add products repeated code
eventManager.addProduct("Pen", "Pink color pen", 300, 102,20)

//Search by product ID
eventManager.getProductByID(2)
eventManager.getProductByID(7)
