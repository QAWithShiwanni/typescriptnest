import { Given, Then, When,setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import loginData from "../data/logindata2.json";
import env from "../data/environment.json";
import leaveData from "../data/leaveData.json";
import { CustomWorld } from "../support/world";
import { EmployeePage } from "../page/employeePage";
import { EntitlementPage } from "../page/entitlementPage";
import { LeavePage } from "../page/leavePage";
import { LoginPage } from "../page/loginPage";
import { DashboardPage } from "../page/dashboardPage";
setDefaultTimeout(60000);

Given('Admin is logged into OrangeHRM', async function (this: CustomWorld) {
    await this.page.goto(env.orrange);
    await this.page.locator('input[name="username"]').fill(loginData.validUsername);
    await this.page.locator('input[name="password"]').fill(loginData.validPassword);
    await this.page.getByRole("button", { name: "Login" }).click();
    await expect(this.page).toHaveURL(/dashboard/);
})
Given('Admin creates leave entitlement for employee {string}', async function (this: CustomWorld, employeeName: string) {
    const employee = new EmployeePage(this.page);
    await employee.ensureEmployeeExists(employeeName);
    const entitlement = new EntitlementPage(this.page);
    await entitlement.createEntitlement(employeeName,leaveData.leaveType,leaveData.entitlementDays);
})
When('Admin opens Assign Leave from Leave Menu', async function (this: CustomWorld) {
    await this.page.getByRole('link', {name: 'Leave',exact: true}).click();
    await this.page.getByRole('link', {name: 'Assign Leave',exact: true}).click();
    await expect(this.page).toHaveURL(/assignLeave/);
    console.log("Admin opened Assign Leave successfully");
})
When('Admin selects employee {string}', async function (this: CustomWorld, employeeName: string) {
    const employeeInput = this.page.getByPlaceholder("Type for hints...");
    await employeeInput.fill(employeeName);
    const suggestion = this.page.getByText(employeeName, {exact: true}).last();
    await suggestion.waitFor({state: "visible",timeout: 10000});
    await suggestion.click();
})
When('Admin selects leave type', async function (this: CustomWorld) {
    const dropdown = this.page.locator(".oxd-select-text").first();
    await dropdown.click();
    await this.page.getByText(leaveData.leaveType,{exact: true}).waitFor({state: "visible",timeout: 10000})
    await this.page.getByText(leaveData.leaveType,{exact: true}).click();
})
When('Admin enters the leave dates', async function (this: CustomWorld) {
    const leavePage = new LeavePage(this.page);
    await leavePage.enterLeaveDates();
})
When('Admin enters the comments', async function (this: CustomWorld) {
    await this.page.locator("textarea").fill(leaveData.comments);
})
When('Admin clicks Assign', async function (this: CustomWorld) {
    await this.page.getByRole("button",{name: "Assign",exact: true}).click();
})
Then('Leave should be assigned successfully', async function (this: CustomWorld) {
    const toast = this.page.locator(".oxd-toast-content-text");
    await expect(toast.last()).toBeVisible();
    console.log(await toast.last().innerText());
})
Then('the assigned leave should appear in Leave List', async function (this: CustomWorld) {
    await this.page.getByText("Leave List").click();
    await expect(this.page).toHaveURL(/viewLeaveList/);
})
// Then('the leave details should match the entered data', async function (this: CustomWorld) {
//     await expect(this.page.getByText(leaveData.expectedEmployee)).toBeVisible();
//     await expect(this.page.getByText(leaveData.expectedLeaveType)).toBeVisible();
// })
Then('the leave details should match {string} of entered data', async function (this: CustomWorld, employeeName: string) {
    const leavePage = new LeavePage(this.page);
    await leavePage.verifyLeaveDetails(employeeName);
})

Given('user logged into the application and navigate to {string} page', async function (this:CustomWorld,menu:string) {
    console.log("Step 1 started");
    const page = this.page;
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    console.log("Opening URL:", env.orrange);
    await loginPage.openLoginPage(env.orrange);
    console.log("Login page opened successfully");
    await loginPage.enterUsername(loginData.validUsername);
    await loginPage.enterPassword(loginData.validPassword);
    await loginPage.clickLogin();
    await dashboard.menuNavigation(menu)
  });
  
Given('user click on {string} Tab', async function (string) {
    const page = this.page;
    const leave = new LeavePage(page);
    await leave.openAssignLeave();
});
When('user assign the leave to {string}', async function (this: CustomWorld, employeeName: string) {
    const leavePage = new LeavePage(this.page);
    await leavePage.AssignLeave({
        name: employeeName,
        leaveType: leaveData.leaveType,
        fDate: leaveData.fromDate,
        comment: leaveData.comments
    });
});
Then('user can able to view the {string} with created {string}', async function (this: CustomWorld,pageName: string,employeeName: string) {
    await this.page.getByText(pageName, { exact: true }).click();
    const leavePage = new LeavePage(this.page);
    await leavePage.verifyLeaveDetails(employeeName);
});