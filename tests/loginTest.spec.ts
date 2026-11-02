import { test, expect } from '@playwright/test';
import loginData from '../src/data/logindata2.json';
import { LoginPage } from '../src/page/LoginPage';
import env from '../src/data/environment.json'

test.describe('orangehrm login tests', () => {

    test.beforeAll(async () => {
        console.log('starting orangehrm login tests');
    });
    test.beforeEach(async ({page})=> {
        await page.goto(env.orrange,{waitUntil:'commit',timeout:60000});
    })

    test('login with valid credentials',{tag:'@valid'}, async ({ page }) => {
        const loginPage = new LoginPage(page);
       
        await loginPage.login(loginData.validUsername, loginData.validPassword);
        await expect(page).toHaveURL(/dashboard/);
    })

    test('login with invalid username',{tag:'@invalid'} ,async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.invalidUsername, loginData.validPassword);
        await expect(page).not.toHaveURL(/dashboard/);
    })

    test('login with invalid password', {tag:'@invalid'},async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.validUsername, loginData.invalidPassword);
        await expect(page).not.toHaveURL(/dashboard/);
    })

    test('login with both invalid credentials',{tag:'@invalid'}, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.invalidUsername, loginData.invalidPassword);
        await expect(page).not.toHaveURL(/dashboard/);
    })

    test('login with empty username',{tag:'@empty'}, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('', loginData.validPassword);
        await expect(page).not.toHaveURL(/dashboard/);
    })

    test('login with empty password',{tag:'@empty'}, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.validUsername, '');
        await expect(page).not.toHaveURL(/dashboard/);
    })

    test('login with empty fields',{tag:'@empty'}, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('', '');
        await expect(page).not.toHaveURL(/dashboard/);
    })

    test('checking forgot password link',{tag:'@link'}, async ({ page }) => {
        await page.getByText('Forgot your password?').click();
        await expect(page).toHaveURL(/requestPasswordResetCode/);
    })

    test.afterAll(async () => {
        console.log('completed orangehrm login tests');
    })
})