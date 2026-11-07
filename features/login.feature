
@orangehrm
Feature: OrangeHRM login functionality

  Background:
    Given the user is on the login page of OrangeHRM

  @valid @smoke
  Scenario: Login with valid credentials
    When the user enters valid username and password
    And click the login button
    Then the user should navigate to dashboard

#   @invalid @regression
#   Scenario Outline: Login with invalid credentials
#     When the user enters "<username>" and "<password>"
#     And click the login button
#     Then an invalid credential message should appear

#     Examples:
#       | username | password |
#       | wrong    | admin123 |
#       | Admin    | wrong123 |
#       | wrong    | wrong123 |

#   @validation
#   Scenario: Login with empty username
#     When the user leaves the username field empty
#     And enter valid password
#     And click the login button
#     Then the username required message should appear

#   @validation
#   Scenario: Login with empty password
#     When the user enters valid username
#     And leaves the password field empty
#     And clicks login button
#     Then a password required message should appear

#   @validation
#   Scenario: Login with both fields empty
#     When the user leaves both username and password fields empty
#     And clicks login button
#     Then a required message should appear

#   @forgotpassword
#   Scenario: Forgot password functionality
#     When the user clicks the forgot password link
#     Then the forgot password page should appear
