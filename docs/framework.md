# OrangeHRM Automation Testing – Framework and Architecture

## 1. Project Introduction

This project focuses on automating the login functionality of the OrangeHRM demo website using Playwright with TypeScript.

The main objective is to understand automation testing concepts, organize test scripts, reuse code, and validate login functionality through automated test cases.

## 2. Framework Used

### Playwright Test Framework

Playwright Test is the automation testing framework used in this project.

It provides features to:
- Write and execute test cases.
- Interact with web elements.
- Perform automated browser testing.
- Validate expected results using assertions.
- Generate test execution reports.

### Technologies Used

- **Playwright:** Browser automation and test execution.
- **TypeScript:** Programming language used to write test scripts.
- **Visual Studio Code:** Code editor.
- **JSON:** Stores test data and environment configuration.
- **Git and GitHub:** Version control and code management.

## 3. Framework Design Approaches

This project combines a few commonly used automation testing approaches.

### 3.1 Page Object Model (POM)

POM is a design pattern used to separate page elements and actions from test scripts.

In this project:
- `LoginPage.ts` contains login-related locators and methods.
- The `LoginPage` class handles login actions.
- The test file calls reusable methods instead of directly interacting with every locator.

**Benefit:** Improves code reusability and makes maintenance easier.

### 3.2 Data-Driven Testing

Data-driven testing allows test cases to use different sets of test data without rewriting the test logic.

In this project, login credentials are stored in `logindata2.json`.

Examples:
- Valid username and password.
- Invalid username and password.

**Benefit:** Makes it easier to test multiple login scenarios.

### 3.3 Modular Framework Structure

The project is divided into separate folders for test scripts, page classes, and test data.

**Benefit:** Keeps the project organized and makes it easier to manage.

### 3.4 Hybrid Framework Approach

The project follows a basic hybrid-style approach because it combines:
- Page Object Model.
- Data-driven testing.
- Playwright Test features.
- Modular folder organization.

It is a beginner-level implementation of these approaches, not a complete enterprise automation framework.

## 4. Project Folder Structure

```text
Automation testing/
│
├── src/
│   ├── page/
│   │   └── LoginPage.ts
│   │
│   └── data/
│       ├── logindata2.json
│       └── environment.json
│
├── tests/
│   └── loginTest.spec.ts
│
├── playwright.config.ts
├── package.json
└── package-lock.json
```

## 5. Architecture of the Framework

The project follows a layered architecture where each part has a separate responsibility.

### Layer 1: Test Layer

**File:** `loginTest.spec.ts`

- Contains test scenarios.
- Uses Playwright's `test()` function.
- Uses assertions through `expect()`.
- Calls methods from the LoginPage class.

### Layer 2: Page Object Layer

**File:** `LoginPage.ts`

- Contains login page locators.
- Contains reusable login methods.
- Handles interactions with the login page.

### Layer 3: Test Data Layer

**File:** `logindata2.json`

- Stores valid and invalid login credentials.
- Provides test data to the test scripts.

### Layer 4: Environment Configuration Layer

**File:** `environment.json`

- Stores the OrangeHRM application URL.
- Helps separate application configuration from test scripts.

### Layer 5: Test Configuration Layer

**File:** `playwright.config.ts`

- Defines Playwright test settings.
- Configures the browser, test directory, and reporter.
- Controls how tests are executed.

## 6. Test Execution Flow

The automation framework works in the following sequence:

1. Playwright Test starts executing the test file.
2. The required application URL is read from `environment.json`.
3. The browser page navigates to OrangeHRM.
4. Login credentials are obtained from `logindata2.json`.
5. The test creates an object of the `LoginPage` class.
6. The login method performs the required actions.
7. Assertions verify whether the expected result is achieved.
8. Playwright generates the test execution report.

## 7. Important Playwright Concepts Used

| Concept | Purpose |
|---|---|
| `test()` | Defines a test case |
| `expect()` | Verifies expected results |
| `test.describe()` | Groups related test cases |
| `test.beforeEach()` | Runs before every test |
| `test.afterAll()` | Runs after all tests |
| `page` | Represents a browser tab |
| `constructor()` | Initializes the LoginPage object |
| `login()` | Reusable method for login actions |
| Tags | Help identify and filter test cases |

## 8. Conclusion

The OrangeHRM automation project uses Playwright with TypeScript and follows a basic hybrid-style framework approach.

By combining POM, JSON-based test data management, and modular organization, the project provides a foundation for building more structured automation testing frameworks.

Future improvements can include better reporting, screenshots on failure, reusable utility methods, multiple environment configurations, and CI/CD integration.