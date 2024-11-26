import puppeteer from "puppeteer";
import Parser from "./erosParser.js";

class Scraper {
    constructor(){
        this.baseUrl = "https://tienda.mercadona.es";
    }
    async init(){
        this.browser = await puppeteer.launch({headless: false});
    }
    async search(query){
        const page = await this.browser.newPage();
        await page.goto(this.baseUrl);
        await page.waitForSelector("body");
        await page.waitForSelector(".postal-code-checker");
        await page.locator(".postal-code-checker input");
        await page.type(".postal-code-checker input","48001");
        // press enter
        await page.keyboard.press('Enter');
        await page.waitForSelector("#search");
        await page.locator("#search");
        await page.type("#search",query);
        await page.keyboard.press('Enter');
        await new Promise((resolve,reject)=> setTimeout(resolve, 500));
        await page.waitForSelector("body");
        for(let i = 0; i < 3;i++){
            await this.autoScroll(page);
        }
        const contentHTML = await page.content();
        await this.browser.close();
        return contentHTML;
    }
    
    async getHtml(url){
        const page = await this.browser.newPage();
        await page.goto(url);
        await page.waitForSelector("body");
        
        //await page.locator(".postal-code-checker button").click();
        for(let i = 0; i < 3;i++){
            await this.autoScroll(page);
        }
        await new Promise((resolve,reject)=> setTimeout(resolve, 5000));
        const contentHTML = await page.content();
        await this.browser.close();
        return contentHTML;
    }
    async autoScroll(page){
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 200;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight - window.innerHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 50);
            });
        });
    }
}

async function test(){
    const scraper = new Scraper();
    await scraper.init();
    
    //const url = "https://supermercado.eroski.es/en/supermarket/2060118-breakfast-and-sweets/2060182-sugar-sweeteners-and-baking-aids/";
    const url ="https://tienda.mercadona.es";
    const html = await scraper.search("cervezas");
    console.log(html);
    //const html = await scraper.search(url,"cervezas");
    //const parser = new Parser(html);
    //const products = parser.getProducts();
    //console.log(products);
}

test();