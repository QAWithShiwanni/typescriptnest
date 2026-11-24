import { Page, expect } from "@playwright/test";
import leaveData from "../data/leaveData.json";

export class EmployeePage {

    constructor(private page: Page) {}

    async employeeExists(employeeName: string): Promise<boolean> {
        const baseUrl = new URL(this.page.url()).origin;
        await this.page.goto(`${baseUrl}/web/index.php/pim/viewEmployeeList`);
        const employeeInput =this.page.getByPlaceholder("Type for hints...").first();
        await employeeInput.fill(employeeName);
        const suggestion = this.page.getByText(employeeName,{ exact: true }).last();
        const suggestionVisible = await suggestion.waitFor({ state: "visible", timeout: 5000 }).then(() => true).catch(() => false);
        if (!suggestionVisible) {
            return false;
        }
        await suggestion.click();
        await this.page.getByRole("button", {name: "Search",exact: true}).click();
        const rows = this.page.locator(".oxd-table-body .oxd-table-row");
        await rows.first().waitFor({state: "visible",timeout: 10000}).catch(() => {});
        return await rows.filter({hasText: employeeName}).count() > 0;
    }
    async createEmployee(): Promise<void> {
        const baseUrl = new URL(this.page.url()).origin;
        await this.page.goto(`${baseUrl}/web/index.php/pim/addEmployee`);
        await this.page.getByPlaceholder("First Name").fill(leaveData.firstName);
        await this.page.getByPlaceholder("Last Name").fill(leaveData.lastName);
        await this.page.getByRole("button", { name: "Save", exact: true }).click();
        await this.page.waitForTimeout(3000);
        console.log("Current URL:", this.page.url());
        console.log("Page content:");
        console.log((await this.page.locator("body").innerText()).slice(-2000));
    }
       async ensureEmployeeExists(employeeName: string): Promise<void> {
        const exists = await this.employeeExists(employeeName);
        if (!exists) {
            console.log("Employee not found. Creating employee...");
            await this.createEmployee();
        } else {
            console.log("Employee already exists.");
        }
    }
}
