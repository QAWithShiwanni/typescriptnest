import{Page}from'@playwright/test';
export class AdminPage{
    constructor(private page:Page){}
    public readonly elAdminMenu='a[href*="/admin/viewAdminModule"]';
    public readonly elUsername='.oxd-input';
    public readonly elDropdown='.oxd-select-text';
    public readonly elSearchButton='button:has-text("Search")';
    public readonly elResetButton='button:has-text("Reset")';
    public readonly elRecords='.oxd-table-card';
    async clickAdmin(){
        await this.page.locator(this.elAdminMenu).click();
    }
    async enterUsername(username:string){
        await this.page.locator(this.elUsername).first().fill(username);
    }
    async clickSearch(){
        await this.page.locator(this.elSearchButton).click();
    }
    async clickReset(){
        await this.page.locator(this.elResetButton).click();
    }
    getUsernameField() {
        return this.page.locator(this.elUsername).first();
    }
    getUserRoleDropdown() {
        return this.page.locator(this.elDropdown).first();
    }
}

