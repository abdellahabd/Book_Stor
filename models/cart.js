const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "data", "cart.json");

module.exports = class Cart {
  static addPROd(id, price) {
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalpric: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      const productindex = cart.products.findIndex((p) => p.id == +id);
      const existprod = cart.products[productindex];
      let newprod;
      if (existprod) {
        existprod.qty = existprod.qty + 1;
        cart.products = [...cart.products];
      } else {
        newprod = { id: id, qty: 1 };
        cart.products = [...cart.products, newprod];
      }
      cart.totalpric += +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
