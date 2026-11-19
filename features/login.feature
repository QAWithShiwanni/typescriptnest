# @orangehrm
# Feature: OrangeHRM login functionality

#   Background:
#     Given the user is on the login page of OrangeHRM

#   @valid @smoke
#   Scenario: Login with valid credentials
#     When the user enters valid username and password
#     And click the login button
#     Then the user should navigate to dashboard

#   @invalid
#   Scenario: Login with invalid credentials
#     When the user enters invalid username and invalid password
#     And click the login button
#     Then an error message should be displayed

#   @invalid
#   Scenario: Login with invalid username and valid password
#     When the user enters invalid username and valid password
#     And click the login button
#     Then an error message should be displayed

#   @invalid
#   Scenario: Login with valid username and invalid password
#     When the user enters valid username and invalid password
#     And click the login button
#     Then an error message should be displayed

#   @empty
#   Scenario: Login with empty username and valid password
#     When the user leaves the username field empty and enters a valid password
#     And click the login button
#     Then the username required message should be displayed

#   @empty
#   Scenario: Login with valid username and empty password
#     When the user enters a valid username and leaves the password field empty
#     And click the login button
#     Then the password required message should be displayed

#   @empty
#   Scenario: Login with both username and password fields empty
#     When the user leaves both username and password fields empty
#     And click the login button
#     Then the required messages should be displayed for both fields

#   @forgotpassword
#   Scenario: Forgot password link functionality
#     When the user clicks on the forgot password link
#     Then the user should navigate to the password reset page
#     And the reset password page should be displayed
