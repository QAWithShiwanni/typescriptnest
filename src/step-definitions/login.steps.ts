import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import loginData from '../data/logindata2.json';
import env from '../data/environment.json';
import { LoginPage } from '../page/loginPage';

Given('the user is on the login page of OrangeHRM', async function (this: CustomWorld) {
    const page = this.page;
   const loginPage= new LoginPage(page)
    await loginPage.openLoginPage(env.orrange);
})
When('the user enters valid username and password', async function (this: CustomWorld) {
    const page = this.page;
    const loginPage= new LoginPage(page)
    await loginPage.enterUsername(loginData.validUsername);
    await loginPage.enterPassword(loginData.validPassword);
})
When('click the login button', async function (this: CustomWorld) {
    const page = this.page;
    const loginPage= new LoginPage(page)
    await loginPage.clickLogin();
})
Then('the user should navigate to dashboard', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/dashboard/);
})