import {setWorldConstructor,World,IWorldOptions} from '@cucumber/cucumber';
import {Browser,BrowserContext,Page} from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { AdminPage } from '../page/adminPage';
export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    testname?: string
   
    constructor(options: IWorldOptions) {
        super(options);
    }
}
setWorldConstructor(CustomWorld);