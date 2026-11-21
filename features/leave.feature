Feature:Assign leave functionality
Background:
Given Admin is logged into OrangeHRM

@assignLeave @positive
Scenario:Successfully assign leave to Sam M
When Admin opens Assign Leave from Quick Launch
And Admin selects employee "Sam M"
And Admin selects leave type "US - Vacation"
And Admin enters the leave dates
And Admin enters the comments "Automation Testing"
And Admin clicks Assign
Then Leave should be assigned successfully
And the assigned leaveshould appear in Leave List
And the leave details should match the entered data