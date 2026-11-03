# Playwright Automation Testing with TypeScript

## Project Overview

This repository contains my automation testing practice using Playwright with TypeScript. The project focuses on automating web application functionality, validating user interactions, and verifying application behavior through automated test cases.

Currently, I have worked on automating the login functionality of the OrangeHRM demo application.

## Technologies Used

- Programming Language:TypeScript
- Automation Tool: Playwright
- Test Runner: Playwright Test
- Code Editor: Visual Studio Code
- Version Control: Git and GitHub
- Test Data: JSON

## Framework and Architecture

This project uses the Playwright Test framework with a Page Object Model (POM) architecture.

### Page Object Model (POM)

POM is a design pattern used to separate page locators and actions from test cases.

In this project:
- Page classes contain locators and reusable functions.
- Test files contain test scenarios and assertions.
- JSON files store test data and environment details.

This approach improves code reusability, readability, and maintainability.

## Project Structure

-text
-Automation testing/
-│
-├── src/
-│   ├── data/
-│   │   ├── logindata2.json
-│   │   └── environment.json
-│   │
-│   └── page/
-│       └── LoginPage.ts
-│
-├── tests/
-│   └── loginTest.spec.ts
-│
-├── playwright.config.ts
-├── package.json
-└── README.md

## Testing Approach

- Automated login functionality.
- Valid and invalid login scenarios.
- Positive and negative test cases.
- Element visibility and URL validation.
- Reusable functions using POM.
- Test data management using JSON files.
- Test organization using tags.

## Test Scenarios

- Login with valid credentials.
- Login with invalid username.
- Login with invalid password.
- Login with both invalid credentials.
- Validate login page elements.
- Verify successful and unsuccessful login behavior.

## Installation and Execution

### 1. Clone the repository

#bash
git clone YOUR_GITHUB_REPOSITORY_URL


### 2. Install dependencies

#bash
npm install

### 3. Install Playwright browsers

#bash
npx playwright install


### 4. Run all test cases

#bash
npx playwright test


### 5. View the HTML report

#bash
npx playwright show-report


## Future Improvements

- Expand automation coverage to additional application functionalities.
- Implement more reusable methods.
- Improve test data management.
- Add more positive and negative test scenarios.
- Explore data-driven testing.
- Learn and implement BDD using Cucumber.
- Integrate automation tests with CI/CD pipelines.

## Learning Outcomes

Through this project, I am gaining practical experience in TypeScript, Playwright automation, test case development, Page Object Model architecture, test data management, and GitHub version control.
