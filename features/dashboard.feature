@orangehrm @dashboard

Feature: OrangeHRM Dashboard Testing

  Background:
    Given the user is on the login page of OrangeHRM
    When the user enters valid username and password
    When click the login button
    Then the user should navigate to dashboard

  @DASH_001
  Scenario: Verify dashboard page loads
    When the user navigates to Dashboard
    Then the dashboard page should load successfully

  @DASH_002
  Scenario: Verify dashboard widgets
    When the user checks the dashboard widgets
    Then the dashboard widgets should be displayed correctly

  @DASH_003
  Scenario: Verify Time at Work section
    When the user checks the Time at Work section
    Then the Time at Work widget should be displayed correctly

  @DASH_004
  Scenario: Verify Quick Launch options
    When the user clicks each Quick Launch option
    Then the user should navigate to the corresponding pages

  @DASH_005
  Scenario: Verify dashboard refresh
    When the user refreshes the dashboard
    Then the dashboard should reload successfully
