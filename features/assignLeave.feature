Feature: Assign Leave Functionality

Background: Login and Assign Leave
Given user logged into the application and navigate to "Leave" page

@login @assignLeave
Scenario: Admin assigns leave to an employee
Given the user is on the login page of OrangeHRM
When the user enters valid username and password
And click the login button
Then the user should navigate to dashboard
Given Admin creates leave entitlement for employee "Sam M"
When Admin opens Assign Leave from Leave Menu
And Admin selects employee "Sam M"
And Admin selects leave type
And Admin enters the leave dates
And Admin enters the comments
And Admin clicks Assign
Then Leave should be assigned successfully
And the assigned leave should appear in Leave List
And the leave details should match "Sam M" of entered data

@simple
Scenario Outline: Admin assigns leave to an employee
And user click on "Assign Leave" Tab
When user assign the leave to "<Employee>"
Then user can able to view the "Leave List" with created "<Employee>"
Examples:
    | Employee |
    | Sam M  |