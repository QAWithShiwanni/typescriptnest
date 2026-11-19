// import { Given, When, Then } from '@cucumber/cucumber';
// import { expect } from '@playwright/test';
// import { CustomWorld } from '../support/world';
// import loginData from '../data/logindata2.json';
// import env from '../data/environment.json';

// Given('the user is logged in to OrangeHRM', 
//     async function (this: CustomWorld) {
//     await this.loginPage.openLoginPage(env.orrange);
//     await this.loginPage.login(
//         loginData.validUsername,
//         loginData.validPassword
//     )
//     await expect(this.page).toHaveURL(/dashboard/);
// })
// When('the user clicks the Admin menu', async function (this: CustomWorld) {
//     await this.adminPage.clickAdmin();
// })
// Then('the Admin page should be displayed', async function (this: CustomWorld) {
//     await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
//     await expect(this.page.getByText('System Users')).toBeVisible();
// })
// Given('the user is on the Admin page', async function (this: CustomWorld) {
//     await this.adminPage.clickAdmin();
// })
// When('the user searches for an existing username', async function (this: CustomWorld) {
//     await this.adminPage.enterUsername(loginData.validUsername);
//     await this.adminPage.clickSearch();
// })
// Then('the matching user should be displayed', async function (this: CustomWorld) {
//     await expect(
//         this.adminPage.getRecords().filter({
//             hasText: loginData.validUsername
//         })
//     ).toBeVisible();
// })
// When('the user searches for a non-existing username', async function (this: CustomWorld) {
//     await this.adminPage.enterUsername('invalid_user_98765');
//     await this.adminPage.clickSearch();
// })
// Then('the no records found message should be displayed', async function (this: CustomWorld) {
//     await expect(this.adminPage.getNoRecordsMessage()).toBeVisible();
// })
// When('the user selects a user role and searches', async function (this: CustomWorld) {
//     await this.adminPage.selectUserRole('Admin');
//     await this.adminPage.clickSearch();
// })
// Then('users belonging to the selected role should be displayed', async function (this: CustomWorld) {
//     await expect(this.adminPage.getRecords().first()).toBeVisible();
//     await expect(this.adminPage.getRecords().first()).toContainText('Admin');
// })
// When('the user enters search filters and clicks Reset', async function (this: CustomWorld) {
//     await this.adminPage.enterUsername(loginData.validUsername);
//     await this.adminPage.selectUserRole('Admin');
//     await this.adminPage.clickReset();
// })
// Then('all search fields should return to default values', async function (this: CustomWorld) {
//     await expect(this.adminPage.getUsernameField()).toHaveValue('');
//     await expect(this.adminPage.getUserRoleDropdown()).toContainText('-- Select --');
// })
