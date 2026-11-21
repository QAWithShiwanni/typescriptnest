import { Before, After, Status, setDefaultTimeout, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, ConsoleMessage } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);
Before(async function (this: CustomWorld,{pickle}:ITestCaseHookParameter) {
    this.browser = await chromium.launch({
        headless: false
    })
    this.context = await this.browser.newContext();
    locale: 'en-US';
    this.page = await this.context.newPage();
    this.page.on('console',async (msg:ConsoleMessage) => {
        if(msg.type() == 'log') await this.attach(msg.text());
    });
    this.testname = pickle.name.replace(/\W/g,'-')
    this.log(this.testname)
})
After(async function (this: CustomWorld, scenario) {
    try {
        if (scenario.result?.status === Status.FAILED && this.page) {
            const screenshot = await this.page.screenshot();
            await this.attach(screenshot, 'image/png');
        }
    } finally {
        if (this.browser) {
            await this.browser.close();
        }
    }
})
