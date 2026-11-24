Feature: Employee Creation

@login @employee
Scenario: Admin logs in and creates a new employee
Given the user is on the login page of OrangeHRM
When the user enters valid username and password
And click the login button
Then the user should navigate to dashboard
When Admin opens the PIM menu
And Admin creates a new employee
Then Employee should be created successfully
Then I can see the created user in the list