import { Page, expect } from "@playwright/test";
import leaveData from "../data/leaveData.json";

export class LeavePage {

    constructor(private page: Page) { }

    async selectEmployee(employeeName: string): Promise<void> {

        const employeeInput =
            this.page.getByPlaceholder("Type for hints...").first();

        await employeeInput.fill(employeeName);

        const suggestion = this.page.getByText(
            employeeName,
            { exact: true }
        ).last();

        await suggestion.waitFor({
            state: "visible",
            timeout: 10000
        });

        await suggestion.click();
    }

    async selectLeaveType(): Promise<void> {

        await this.page.locator(".oxd-select-text").first().click();

        await this.page.getByText(
            leaveData.leaveType,
            { exact: true }
        ).click();
    }

    async entitlementExists(employeeName: string): Promise<boolean> {

        const baseUrl = new URL(this.page.url()).origin;

        await this.page.goto(
            `${baseUrl}/web/index.php/leave/viewLeaveEntitlements`
        );

        await this.selectEmployee(employeeName);
        await this.selectLeaveType();

        await this.page.getByRole("button", {
            name: "Search",
            exact: true
        }).click();

        const rows = this.page.locator(
            ".oxd-table-body .oxd-table-row"
        );

        await rows.first().waitFor({
            state: "visible",
            timeout: 10000
        }).catch(() => { });

        const matchingRows = rows.filter({
            hasText: employeeName
        }).filter({
            hasText: leaveData.leaveType
        });

        return await matchingRows.count() > 0;
    }

    async createEntitlement(employeeName: string): Promise<void> {

        await this.page.getByRole("button", {
            name: "Add",
            exact: true
        }).click();

        await this.selectEmployee(employeeName);
        await this.selectLeaveType();

        await this.page.getByRole("spinbutton").fill(String(leaveData.entitlementDays));

        await this.page.getByRole("button", {
            name: "Save",
            exact: true
        }).click();

        const dialog = this.page.locator(".oxd-dialog-container");

        await expect(dialog).toBeVisible();

        const confirmButton = dialog.getByRole("button", {
            name: "Confirm",
            exact: true
        });

        await expect(confirmButton).toBeVisible();
        await expect(confirmButton).toBeEnabled();

        await confirmButton.click();

        await expect(dialog).toBeHidden({
            timeout: 15000
        });

        console.log("Entitlement updated successfully.");
    }

    async ensureEntitlementExists(employeeName: string): Promise<void> {

        const exists = await this.entitlementExists(employeeName);

        if (!exists) {

            console.log("Entitlement not found. Creating entitlement...");

            await this.createEntitlement(employeeName);

        } else {

            console.log("Matching entitlement already exists.");

        }
    }

    async openAssignLeave(): Promise<void> {

        const baseUrl = new URL(this.page.url()).origin;

        await this.page.goto(
            `${baseUrl}/web/index.php/leave/assignLeave`
        );

        await expect(
            this.page.getByRole("heading", {
                name: "Assign Leave"
            })
        ).toBeVisible();
    }

    async selectCalendarDate(
        dateIndex: number,
        dateValue: string
    ): Promise<void> {

        const [year, month, day] = dateValue.split("-").map(Number);

        const monthNames = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        await this.page.locator(".oxd-date-input-icon")
            .nth(dateIndex)
            .click();
        await this.page.locator(".oxd-calendar-selector-month").click();
        await this.page.locator(".oxd-calendar-dropdown--option")
            .getByText(monthNames[month - 1], { exact: true })
            .click();
        await this.page.locator(".oxd-calendar-selector-year").click();
        await this.page.locator(".oxd-calendar-dropdown--option")
            .getByText(String(year), { exact: true })
            .click();
        const dayLocator = this.page.locator(
            ".oxd-calendar-date:not(.--other-month)"
        ).getByText(String(day), { exact: true });
        await dayLocator.click();
    }
    async enterLeaveDates(): Promise<void> {
        const dateInputs = this.page.locator(".oxd-date-input input");
        await dateInputs.nth(0).fill(leaveData.fromDate);
        const selectedToDate = await dateInputs.nth(1).inputValue();
        console.log("From Date:", leaveData.fromDate);
        console.log("Automatically selected To Date:", selectedToDate);
    }
    async enterComments(): Promise<void> {
        await this.page.getByPlaceholder("Comment").fill(
            leaveData.comments
        );
    }
    async clickAssign(): Promise<void> {
        await this.page.getByRole("button", {
            name: "Assign",
            exact: true
        }).click();
        const confirmButton = this.page.getByRole("button", {
            name: "Confirm",
            exact: true
        });
        if (await confirmButton.isVisible().catch(() => false)) {
            await confirmButton.click();
        }
    }
    async verifySuccessfulAssignment(): Promise<void> {
        const toast = this.page.locator(".oxd-toast");
        await expect(toast).toBeVisible({ timeout: 15000 });
        console.log("Leave assigned successfully.");
    } async verifyLeaveRecord(employeeName: string): Promise<void> {
        const baseUrl = new URL(this.page.url()).origin;
        await this.page.goto(`${baseUrl}/web/index.php/leave/viewLeaveList`);
        await this.selectEmployee(employeeName);
        const statusFilter = this.page.locator(".oxd-input-group").filter({ hasText: "Show Leave with Status" }).locator(".oxd-select-text");
        await statusFilter.click();
        await this.page.getByText("Taken", { exact: true }).last().click();
        await this.page.getByRole("button", { name: "Search", exact: true }).click();
        console.log(`Searching Taken leave records for ${employeeName}`);
    }
    async verifyLeaveDetails(employeeName: string): Promise<void> {
        await this.verifyLeaveRecord(employeeName);
        const rows = this.page.locator(".oxd-table-body .oxd-table-row");
        const matchingRow = rows.filter({ hasText: employeeName }).filter({ hasText: leaveData.leaveType });
        await expect(matchingRow.first()).toBeVisible({ timeout: 15000 });
        await expect(matchingRow.first()).toContainText(leaveData.fromDate);
        console.log("Employee name, leave type and From Date verified successfully.");
    }
    async AssignLeave(leave: { name?: string, leaveType?: string, fDate?: string, tDate?: string, comment?: string }) {
        if (leave.name) {
            await this.page.getByPlaceholder("Type for hints...").fill(leave.name);
            const employee = this.page.getByText(leave.name, { exact: true }).last();
            await employee.click();
        } if (leave.leaveType) {
            await this.page.locator(".oxd-select-text").first().click();
            await this.page.getByText(leave.leaveType, { exact: true }).click();
        } if (leave.fDate) {
            await this.page.locator(".oxd-date-input input").nth(0).fill(leave.fDate);
        } if (leave.tDate) {
            await this.page.locator(".oxd-date-input input").nth(1).fill(leave.tDate);
        } if (leave.comment) {
            await this.page.locator("textarea").fill(leave.comment);
        }
    }
}
