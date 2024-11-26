import puppeteer from "puppeteer";
import Parser from "./erosParser.js";

class EroScraper {
    constructor(){
        this.baseUrl = "https://supermercado.eroski.es/en/supermarket/";
    }
    async init(){
        this.browser = await puppeteer.launch({headless: false});
    }
    async search(query){
        const page = await this.browser.newPage();
        await page.goto(this.baseUrl);
        await page.waitForSelector("body");
        
        await page.waitForSelector("#onetrust-reject-all-handler");
        await page.locator("#onetrust-reject-all-handler").click();
        
        await page.waitForSelector("#searchTerm");
        page.locator("#searchTerm");
        await page.type("#searchTerm",query);
        await page.locator("form#searchForm .search-button").click();
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
        for(let i = 0; i < 3;i++){
            await this.autoScroll(page);
        }
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

export default EroScraper;