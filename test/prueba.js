import Parser from "../src/utils/parser.js";
import fs from "fs";

const html = fs.readFileSync("test/cervezas.html");
const parser = new Parser(html);
const products = parser.getProducts();
console.log(products);