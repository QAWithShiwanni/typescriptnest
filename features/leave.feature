# Feature: Assign Leave Functionality
# @login @assignLeave
# Scenario: Admin assigns leave to an employee
# Given Admin is logged into OrangeHRM
# And Admin creates leave entitlement for employee "<Employee>"
# When Admin opens Assign Leave from Leave Menu
# And Admin selects employee "<Employee>"
# And Admin selects leave type
# And Admin enters the leave dates
# And Admin enters the comments
# And Admin clicks Assign
# Then Leave should be assigned successfully
# And the assigned leave should appear in Leave List
# # And the leave details should match the entered data
# And the leave details should match "<Employee>" of entered data
# Examples:
# |Employee|
# |Sam M| 