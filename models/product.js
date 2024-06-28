//represents a single  entity
const fs = require("fs");
const path = require("path");
const products = [];

//import cart model in product model to implement deletion of products
const Cart=require('./cart');	

module.exports = class Product {
  constructor(id,title, imageUrl, price, description) { //if id already exists(in case of update) or if it doesnt exist and it is null initially , then math.random creates an id for us
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    // const p = path.join(path.dirname(require.main.filename),'data');

    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex=products.findIndex(prod=>prod.id===this.id);
        const updatedProducts=[...products];
        updatedProducts[existingProductIndex]=this;
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }else{
        this.id = Math.random().toString(); //as a dummy value

        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });

      }
      
    });
    products.push(this);
  }


  static deleteById(id){
    getProductsFromFile(products=>{
      const product=products.find(prod=>prod.id===id); //get product info which can be used to access the product price
      const updatedProducts = products.filter(prod=> prod.id!==id);//if this condition is true, it will be kept in the array and the rest will be filtered out
      fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
        if(!err){
          //also remove it from the cart
          Cart.deleteProduct(id,this.price);

        }
      })
    });

  }

  static fetchAll() {
    return products; //the products array is returned
  }

  static findById(id,cb){
    getProductsFromFile(products=>{
      const product = products.find(p=> p.id===id);//if this condition is true, the product that we are currently accessing will be returned back
      cb(product);
    })
  }
};


