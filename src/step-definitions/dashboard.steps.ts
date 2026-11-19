import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('the user navigates to Dashboard', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/dashboard/);
})

Then('the dashboard page should load successfully', async function (this: CustomWorld) {
    await expect(this.page.getByText('Dashboard', { exact: true }).first()).toBeVisible();
})
When('the user checks the dashboard widgets', async function (this: CustomWorld) {
    await this.page.waitForLoadState('domcontentloaded');
})
Then('the dashboard widgets should be displayed correctly', async function (this: CustomWorld) {
    await expect(this.page.getByText('Time at Work')).toBeVisible();
    await expect(this.page.getByText('My Actions')).toBeVisible();
    await expect(this.page.getByText('Quick Launch')).toBeVisible();
})
When('the user checks the Time at Work section', async function (this: CustomWorld) {
    await this.page.waitForLoadState('domcontentloaded');
})
Then('the Time at Work widget should be displayed correctly', async function (this: CustomWorld) {
    await expect(this.page.getByText('Time at Work')).toBeVisible();
})

When('the user clicks each Quick Launch option', async function (this: CustomWorld) {

    const options = [
        { name: 'Assign Leave', url: /leave\/assignLeave/ },
        { name: 'Leave List', url: /leave\/viewLeaveList/ },
        { name: 'Timesheets', url: /time\/viewEmployeeTimesheet/ },
        { name: 'Apply Leave', url: /leave\/applyLeave/ },
        { name: 'My Leave', url: /leave\/viewMyLeaveList/ },
        { name: 'My Timesheet', url: /time\/viewMyTimesheet/ }
    ];

    for (const option of options) {
        const quickLaunch = this.page.locator('.orangehrm-quick-launch-card').filter({ hasText: option.name });
        await expect(quickLaunch).toBeVisible();
        await quickLaunch.click();
        await this.page.waitForURL(option.url, {
            timeout: 15000
        });
        await expect(this.page).toHaveURL(option.url);
        const dashboardLink = this.page.getByRole('link', {
            name: 'Dashboard'
        })
        await dashboardLink.click();
        await this.page.waitForURL(/dashboard/, {
            timeout: 15000
        })
    }
})
Then('the user should navigate to the corresponding pages', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/dashboard/);
})
When('the user refreshes the dashboard', async function (this: CustomWorld) {
    await this.page.reload();
})
Then('the dashboard should reload successfully', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.getByText('Dashboard', { exact: true }).first()).toBeVisible();
})