import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../page/loginPage';
import { AdminPage } from '../page/adminPage';

setDefaultTimeout(30 * 1000);
Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: false
    })
    this.context = await this.browser.newContext();
    locale: 'en-US';
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.adminPage = new AdminPage(this.page);
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
