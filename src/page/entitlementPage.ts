import { Page, expect } from "@playwright/test";
export class EntitlementPage {

    constructor(private page: Page) {}

    async openAddEntitlement() {
        const baseUrl = new URL(this.page.url()).origin;
        await this.page.goto(`${baseUrl}/web/index.php/leave/addLeaveEntitlement`);
        await expect(this.page.getByText("Add Leave Entitlement", { exact: true })).toBeVisible();
    }
    async selectEmployee(employeeName: string) {
        const employeeInput = this.page.getByPlaceholder("Type for hints...");
        await employeeInput.fill(employeeName);
        const employeeOption = this.page.getByText(employeeName, {exact: true}).last();
        await employeeOption.waitFor({state: "visible",timeout: 10000});
        await employeeOption.click();
    }
    async selectLeaveType(leaveType: string) {
        const dropdown = this.page.locator(".oxd-select-text").first();
        await dropdown.click();
        const option = this.page.getByText(leaveType,{exact: true}).last();
        await option.waitFor({state: "visible",timeout: 10000});
        await option.click();
    }
    async enterEntitlementDays(days: number) {
        const entitlementField = this.page.locator(".oxd-input-group").filter({ hasText: "Entitlement" }).locator("input");
        await entitlementField.fill(days.toString());
    }
    async saveEntitlement() {
        console.log("Clicking Save button");
        await this.page.getByRole("button", {name: "Save",exact: true}).click();
        console.log("Save button clicked");
        await this.page.waitForTimeout(2000);
        console.log("Current URL:", this.page.url());
        console.log("Current page text:");
        console.log((await this.page.locator("body").innerText()).slice(-1500));
        await this.page.pause();
    }    
 
async createEntitlement(employeeName: string,leaveType: string,days: number) {
    await this.openAddEntitlement();
    await this.selectEmployee(employeeName);
    await this.selectLeaveType(leaveType);
    await this.enterEntitlementDays(days);
    await this.page.getByRole("button", {name: "Save",exact: true}).click();
    const confirmButton = this.page.getByRole("button", {name: "Confirm",exact: true});
    const confirmationAppeared = await confirmButton.waitFor({ state: "visible", timeout: 10000 }).then(() => true).catch(() => false);
    if (confirmationAppeared) {
        await confirmButton.click();
        console.log("Entitlement confirmation clicked.");
        await expect(confirmButton).toBeHidden({timeout: 15000});
    } else {
        console.log("No confirmation popup appeared.");
    }
    console.log("Entitlement submission completed.");
}
}

