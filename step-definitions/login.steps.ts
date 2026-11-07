import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, expect } from '@playwright/test';
import { CustomWorld } from '../src/support/world';

Given('the user is on the login page of OrangeHRM',
    async function (this: CustomWorld) {
        // const browser:Browser
        console.log(this.page);
        
        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
})
When('the user enters valid username and password',
    async function (this: CustomWorld) {
        await this.page.getByPlaceholder('Username').fill('Admin');
        await this.page.getByPlaceholder('Password').fill('admin123');
})
When('the user enters {string} and {string}',
    async function (this: CustomWorld, username: string, password: string) {
        await this.page.getByPlaceholder('Username').fill(username);
        await this.page.getByPlaceholder('Password').fill(password);
})
When('click the login button',
    async function (this: CustomWorld) {
        await this.page.getByRole('button', { name: 'Login' }).click();
})
Then('the user should navigate to dashboard',
    async function (this: CustomWorld) {
        await expect(this.page).toHaveURL(/dashboard/);
})
Then('an invalid credential message should appear',
    async function (this: CustomWorld) {
        await expect(this.page.getByText('Invalid credentials')).toBeVisible();
})
When('the user leaves the username field empty',
    async function (this: CustomWorld) {
        await this.page.getByPlaceholder('Username').clear();
})
When('enter valid password',
    async function (this: CustomWorld) {
        await this.page.getByPlaceholder('Password').fill('admin123');
})
Then('the username required message should appear',
    async function (this: CustomWorld) {
      await expect(this.page.locator('.oxd-input-field-error-message').first()).toHaveText('Required');
})
When('the user enters valid username',
    async function (this: CustomWorld) {
        await this.page.getByPlaceholder('Username').fill('Admin');
})
When('leaves the password field empty',
    async function (this: CustomWorld) {
     await this.page.getByPlaceholder('Password').clear();
})
When('clicks login button',
    async function (this: CustomWorld) {
      await this.page.getByRole('button', { name: 'Login' }).click();
})
Then('a password required message should appear',
    async function (this: CustomWorld) {
      await expect(this.page.locator('.oxd-input-field-error-message').first()).toHaveText('Required');
})
When('the user leaves both username and password fields empty',
    async function (this: CustomWorld) {
      await this.page.getByPlaceholder('Username').clear();
      await this.page.getByPlaceholder('Password').clear();
})
Then('a required message should appear',
    async function (this: CustomWorld) {
      await expect(this.page.locator('.oxd-input-field-error-message').first()).toHaveText('Required');
      await expect(this.page.locator('.oxd-input-field-error-message').nth(1)).toHaveText('Required');
})
When('the user clicks the forgot password link',
    async function (this: CustomWorld) {
      await this.page.getByText('Forgot your password?').click();
})
Then('the forgot password page should appear',
    async function (this: CustomWorld) {
        await expect(this.page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
})
