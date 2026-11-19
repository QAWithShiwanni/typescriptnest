import {Page} from "@playwright/test";
export class LoginPage {

    constructor(private page: Page) {}

    public readonly elUserName = 'input[name="username"]';
    public readonly elPassword = 'input[name="password"]';
    public readonly elSubmitBtn = 'button[type="submit"]';
    public readonly elForgotPassword ='p:has-text("Forgot your password?")';
    public readonly elInvalidMessage ='.oxd-alert-content-text';
    public readonly elRequiredMessage ='.oxd-input-field-error-message';
    
    async openLoginPage(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }
    async enterUsername(username: string) {
        await this.page.locator(this.elUserName).fill(username);
    }
    async enterPassword(password: string) {
        await this.page.locator(this.elPassword).fill(password);
    }
    async clickLogin() {
        await this.page.locator(this.elSubmitBtn).click();
    }
    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
    async clearUsername() {
        await this.page.locator(this.elUserName).clear();
    }
    async clearPassword() {
        await this.page.locator(this.elPassword).clear();
    }
    async clickForgotPassword() {
        await this.page.locator(this.elForgotPassword).click();
    }
    getInvalidMessage() {
        return this.page.locator(this.elInvalidMessage);
    }
    getRequiredMessages() {
        return this.page.locator(this.elRequiredMessage);
    }
    getResetPasswordHeading() {
        return this.page.getByRole('heading', {
            name: 'Reset Password'
        });
    }
}