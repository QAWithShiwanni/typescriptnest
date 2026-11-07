import { Before, After, BeforeAll } from '@cucumber/cucumber';
import { chromium, ChromiumBrowser, FirefoxBrowser, WebKitBrowser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: ChromiumBrowser|WebKitBrowser|FirefoxBrowser
let page;
BeforeAll(async function(){
    browser = await chromium.launch({
        headless: false
    });

}) 


Before(async function (this: CustomWorld) {

    console.log('Before scenario');
    // browser = await chromium.launch({
    //     headless: false
    // });

    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    console.log("before all",this.page);
    
});

After(async function (this: CustomWorld) {

    console.log('After scenario');

    await browser.close();

});
