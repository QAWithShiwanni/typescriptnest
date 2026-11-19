@admin
Feature:OrangeHRM Admin Menu
Background:
Given the user is logged in to OrangeHRM
@ADM_001
Scenario:Verify Admin menu navigation
When the user clicks the Admin menu
Then the Admin page should be displayed
@ADM_002
Scenario:Verify user search
Given the user is on the Admin page
When the user searches for an existing username
Then the matching user should be displayed
@ADM_003
Scenario:Verify search with invalid username
Given the user is on the Admin page
When the user searches for a non-existing username
Then the no records found message should be displayed
@ADM_004:
Scenario:Verify user role filter
Given the user is on the Admin page
When the user selects a user role and searches
Then users belonging to the selected role should be displayed
@ADM_005
Scenario:Verify Reset functionality
Given the user is on the Admin page
When the user enters search filters and clicks Reset
Then all search fields should return to default values
