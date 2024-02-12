import express from "express";
import ProductManager from "./ProductManager.js";

const app = express()
app.use(express.urlencoded({extended:true}))

const PORT = 8080

//ProductManager tools
const eventManager = new ProductManager()
const getProducts = eventManager.getInfo()
let allProducts = await getProducts

app.get("/products", (req,res) => {

    let limit = req.query.limit;

    let limitedProducts = allProducts.slice(0,limit)
    res.send(limitedProducts)
})

app.get("/products/:pid", (req,res) => {

    let pid = parseInt(req.params.pid)
    let productById = allProducts.find(product => product.id === pid)

    if(!productById) return res.send(`Error. Product Id number ${pid} not found.`)
    res.send(productById)
})

app.listen(PORT, () => console.log("Server running on port", PORT))