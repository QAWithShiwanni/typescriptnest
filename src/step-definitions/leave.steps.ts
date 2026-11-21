import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import loginData from '../data/logindata2.json';
import env from '../data/environment.json';
import { CustomWorld } from '../support/world';
import { DashboardPage } from "../page/dashboardPage";

Given('Admin is logged into OrangeHRM', async function (this:any) {
    await this.page.goto(env.orrange);
    await this.page.locator('input[name="username"]').fill(loginData.validUsername);
    await this.page.locator('input[name="password"]').fill(loginData.validPassword);
    await this.page.getByRole("button",{name:"Login"}).click();
    await expect(this.page).toHaveURL(/dashboard/);
  });
  When('Admin opens Assign Leave from Quick Launch', async function (this:CustomWorld) {
    await this.page.pause();
    // await this.page.getByText("Assign Leave",{exact:true}).first().click();
    const page = this.page;
    const leave = new DashboardPage(page);
    await leave.quickLaunchOptionClick();
    
  });
  
  When('Admin selects employee {string}', async function (employee:string) {
    
    await this.page.getByPlaceholder("Type for hints...").fill(employee);
    await this.page.getByText(employee,{exact:true}).last().click();
  });
  When('Admin selects leave type {string}', async function (leaveType:string) {
        const dropdown = this.page.locator(".oxd-select-text").first();
        await dropdown.click();
        console.log("Leave type dropdown opened");
        await this.page.getByText(leaveType, { exact: true }).waitFor({
            state: "visible",
            timeout: 10000
        });
        await this.page.getByText(leaveType, { exact: true }).click();
  });
  When('Admin enters the leave dates', async function (this:any) {
    const dates=this.page.locator('input[placeholder="yyyy-dd-mm"]');
    await dates.nth(0).fill("2026-12-01");
    //await dates.nth(1).fill("2026-12-02");
  });
  When('Admin enters the comments {string}', async function (comment:string) {
    await this.page.locator("textarea").fill(comment);
  });
  When('Admin clicks Assign', async function (this:any) {
    await this.page.getByRole("button",{name:"Assign",exact:true}).click();
  });
  Then('Leave should be assigned successfully', async function (this:any) {
        const toast = this.page.locator(".oxd-toast-content-text");
        await expect(toast.nth(1)).toBeVisible();
        console.log(await toast.nth(1).innerText());
  });
  Then('the assigned leaveshould appear in Leave List', async function (this:any) {
    await this.page.getByText("Leave List").click();
    await expect(this.page).toHaveURL(/viewLeaveList/);
  });
  Then('the leave details should match the entered data', async function (this:any) {
    await expect(this.page.getByText("Sam M")).toBeVisible();
    await expect(this.page.getByText("US - Vacation")).toBeVisible();
  });
