import { Page } from "@playwright/test";
export class LoginPage {
  
  constructor(private page: Page) {
    this.page = page;
  }
  public readonly elUserName='input[name="username"]';
  public readonly elPassword='input[name="password"]';
  public readonly elSubmitBtn='button[type="submit"]';
  async login(username: string, password: string) {
    await this.page.locator(this.elUserName).fill(username);
    await this.page.locator(this.elPassword).fill(password);
    await this.page.locator(this.elSubmitBtn).click();
    // await this.page.waitForLoadState('')
  }
  
}
