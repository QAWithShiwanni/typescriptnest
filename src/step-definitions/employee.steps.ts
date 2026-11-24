import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { EmployeePage } from "../page/employeePage";
import { expect } from "@playwright/test";
import leaveData from "../data/leaveData.json";

When("Admin opens the PIM menu", async function (this: CustomWorld) {
    await this.page.getByText("PIM", { exact: true }).click();
})
When("Admin creates a new employee", async function (this: CustomWorld) {
    const employeePage = new EmployeePage(this.page);
    await employeePage.createEmployee();
})
Then("Employee should be created successfully", async function (this: CustomWorld) {
    await expect(this.page.getByText("Personal Details", { exact: false }).first()).toBeVisible({ timeout: 15000 });
    console.log("Employee created successfully!");
})
