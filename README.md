# Playwright Automation Testing with TypeScript

## Project Overview

This repository contains my automation testing practice using Playwright with TypeScript. The project focuses on automating web application functionalities, validating user interactions, and verifying application behavior through automated test scenarios.

The project uses the OrangeHRM demo application to practice end-to-end automation testing, including login, employee creation, leave entitlement, and leave assignment functionalities.

## Technologies Used

- Programming Language: TypeScript
- Automation Tool: Playwright
- BDD Framework: Cucumber
- Test Runner: Cucumber
- Design Pattern: Page Object Model (POM)
- Code Editor: Visual Studio Code
- Version Control: Git and GitHub
- Test Data Management: JSON

## Framework and Architecture

This project uses Playwright with TypeScript and Cucumber for Behavior-Driven Development (BDD), following the Page Object Model (POM) architecture.

### Page Object Model (POM)

POM is a design pattern used to separate page locators and reusable actions from test scenarios.

In this project:
- Page classes contain locators and reusable functions.
- Feature files contain test scenarios written in Gherkin syntax.
- Step definition files connect feature steps with Playwright actions.
- Support files manage browser setup and Cucumber hooks.
- JSON files store test data and environment details.

This approach improves code reusability, readability, and maintainability.

### Behavior-Driven Development (BDD)

Cucumber is used to write test scenarios in simple, readable language using Gherkin keywords such as:
- Feature
- Scenario
- Scenario Outline
- Given
- When
- Then
- And
- Examples

## Project Structure

```text
Automation testing/
│
├── features/
│   ├── employee.feature
│   └── assignLeave.feature
│
├── step-definitions/
│   ├── login.steps.ts
│   ├── employee.steps.ts
│   └── leave.steps.ts
│
├── page/
│   ├── loginPage.ts
│   ├── employeePage.ts
│   ├── leavePage.ts
│   └── entitlementPage.ts
│
├── support/
│   ├── world.ts
│   └── hooks.ts
│
├── data/
│   ├── logindata2.json
│   ├── environment.json
│   └── leaveData.json
│
├── package.json
├── tsconfig.json
└── README.md
```

## Testing Approach

- Automated functional testing using Playwright.
- BDD test scenarios using Cucumber.
- Reusable page methods using POM.
- Test data management using JSON files.
- Positive and negative test scenarios.
- Assertions to validate application behavior.
- Scenario execution using Cucumber tags.

## Test Scenarios

### Login Functionality
- Login with valid credentials.
- Validate successful navigation to the dashboard.

### Employee Management
- Navigate to the PIM module.
- Create a new employee.
- Verify successful employee creation.

### Leave Management
- Create leave entitlement for an employee.
- Navigate to the Assign Leave page.
- Select employee and leave type.
- Enter leave dates and comments.
- Assign leave to an employee.
- Verify assigned leave details in the Leave List.

## Installation and Execution

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Run all Cucumber test scenarios

```bash
npx cucumber-js
```

### 5. Run a specific scenario using tags

```bash
npx cucumber-js --tags "@assignLeave"
```

```bash
npx cucumber-js --tags "@login"
```

## Future Improvements

- Expand automation coverage to additional application functionalities.
- Improve reusable page methods and framework structure.
- Add more positive and negative test scenarios.
- Improve test data management.
- Implement additional BDD scenarios using Cucumber.
- Explore data-driven testing using Scenario Outline.
- Integrate automation tests with CI/CD pipelines.

## Learning Outcomes

Through this project, I am gaining practical experience in:

- TypeScript programming.
- Playwright automation testing.
- Cucumber and BDD concepts.
- Gherkin syntax and step definitions.
- Page Object Model architecture.
- Test data management using JSON.
- Git and GitHub version control.
- End-to-end web application testing.
