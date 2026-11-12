import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../src/support/world';
import { LoginPage } from '../src/page/loginPage';
import loginData from '../src/data/logindata2.json';
import env from '../src/data/environment.json';

function getLoginPage(world: CustomWorld) {
    return new LoginPage(world.page);
}

Given('the user is on the login page of OrangeHRM',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.openLoginPage(env.orrange);
    }
)
When('the user enters valid username and password',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.enterUsername(loginData.validUsername);
        await loginPage.enterPassword(loginData.validPassword);
    }
)
When('the user enters invalid username and invalid password',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.enterUsername(loginData.invalidUsername);
        await loginPage.enterPassword(loginData.invalidPassword);
    }
)
When('the user enters invalid username and valid password',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.enterUsername(loginData.invalidUsername);
        await loginPage.enterPassword(loginData.validPassword);
    }
)
When('the user enters valid username and invalid password',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.enterUsername(loginData.validUsername);
        await loginPage.enterPassword(loginData.invalidPassword);
    }
)
When('click the login button',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.clickLogin();
    }
)
Then('the user should navigate to dashboard',
    async function (this: CustomWorld) {
        await expect(this.page).toHaveURL(/dashboard/);
    }
)
Then('an error message should be displayed',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await expect(loginPage.getInvalidMessage()).toHaveText('Invalid credentials');
    }
)
When('the user leaves the username field empty and enters a valid password',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.clearUsername();
        await loginPage.enterPassword(loginData.validPassword);
        await loginPage.clickLogin();
    }
)
Then('the username required message should be displayed',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await expect(loginPage.getRequiredMessages().first()).toHaveText('Required');
    }
)
When('the user enters a valid username and leaves the password field empty',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.enterUsername(loginData.validUsername);
        await loginPage.clearPassword();
        await loginPage.clickLogin();
    }
)
Then('the password required message should be displayed',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await expect(loginPage.getRequiredMessages().first()).toHaveText('Required');
    }
)
When('the user leaves both username and password fields empty',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.clearUsername();
        await loginPage.clearPassword();
        await loginPage.clickLogin();
    }
)
Then('the required messages should be displayed for both fields',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        const requiredMessages = loginPage.getRequiredMessages();
        await expect(requiredMessages).toHaveCount(2);
        await expect(requiredMessages.first()).toHaveText('Required');
        await expect(requiredMessages.nth(1)).toHaveText('Required');
    }
)
When('the user clicks on the forgot password link',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await loginPage.clickForgotPassword();
    }
)
Then('the user should navigate to the password reset page',
    async function (this: CustomWorld) {
        await expect(this.page).toHaveURL(/requestPasswordReset/);
    }
)
Then('the reset password page should be displayed',
    async function (this: CustomWorld) {
        const loginPage = getLoginPage(this);
        await expect(loginPage.getResetPasswordHeading()).toBeVisible();
    }
)
