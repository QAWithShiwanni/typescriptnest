import {Page} from "@playwright/test";
export class DashboardPage {

    constructor(private page: Page) {
        page = this.page;
    }

    public readonly elAssignLeaveBtn = `Assign Leave`

  async quickLaunchOptionClick(option?:string) {
    // await this.page.getByRole("button",{})
    await this.page.getByTitle(this.elAssignLeaveBtn).first().click();
    if(option?.toLocaleLowerCase() === 'assign leave') {
        await this.page.getByTitle(this.elAssignLeaveBtn).first().click();
    } else if (option?.toLocaleLowerCase() === 'Leave List') {
        await this.page.getByTitle("Leave List").first().click();
    }
    // await this.page.click()
  }
    

}