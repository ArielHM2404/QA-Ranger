# Technical Assessment for QA Engineer at Ranger

## Overview

In this exercise, you will work with Playwright (written in TypeScript) to create and complete three automated tests for Wikipedia.

You’ll start by implementing a login test from scratch, then finish two existing tests that were partially generated using Ranger’s test recorder and code generation tool.

You have one hour to complete this exercise on your own. When the hour is up, your interviewer will rejoin the call to discuss your work. You’ll walk them through what you accomplished, highlight what went well, and note any improvements you would have made with additional time.

## Your Task

1. Implement a login test and capture the storage state so the remaining tests run as a logged in user
    - In `login.test.ts`, create a test that signs into Wikipedia
    - Create an account if you don't already have one
    - Add your sign in credentials to `.env`
2. Complete the Wikipedia search test
    - In `searchWikipedia.ts`, finish the existing test so that it correctly implements the test case in the file
3. Complete the Wikipedia home page actions test
    - In `wikipediaHomepageActions.ts`, finish the existing test so that it correctly implements the test case in the file

Each test file contains more detailed instructions.

After you finish all three tests, please come back to this file. Imagine Wikipedia is a Ranger customer, and these tests are part of their end-to-end test suite. Write a technical message to Wikipedia describing the updates you made to `searchWikipedia.ts` and `wikipediaHomepageActions.ts`—specifically, what changed and why.


### ✅ Updates to `searchWikipedia.ts`

Several improvements were made to ensure the test is functional, reliable, and consistently valid:

- **Replaced the original locator** for the *Artificial Intelligence* article. The previous implementation returned multiple matches; I created a unique and stable locator to ensure accuracy.
- **Updated the language selection dropdown locator** to handle dynamic language changes. The new implementation uses a regex-based locator to match the dropdown search box across multiple languages, improving reliability.
- **Introduced a retry mechanism for the `languageDropdownWindow`** to ensure the dropdown opens successfully. If the initial click doesn’t register (due to timing issues), the test re-attempts the action, adding robustness to the interaction.
- **Encapsulated repetitive logic into helper functions** (`ensureDropdownVisible`, `selectLanguage`, and `verifyLanguageChange`) to improve code readability and maintainability.
- **Added `test.step()` structure** to clearly separate and document each step of the test, making it easier to debug and analyze failures.
- **Enhanced the `View History` verification step** by adding assertions to validate the presence of the page history and the last editor's name.

---

### ✅ Updates to `wikipediaHomepageActions.ts`

The focus in this test was ensuring all expected assertions were present, locators were stable, and interactions were reliable:

- **Replaced the `totalArticlesLink` locator** with a regex-based dynamic locator to handle daily updates in article counts. This ensures the test remains stable regardless of the changing numbers.
- **Added an assertion** to validate that the number of articles is less than 7,000,000. If this threshold is exceeded, the test provides a clear error message to aid in debugging.
- **Introduced a reusable helper function (`clickRadioButton`)** to handle radio button interactions with retry logic and proper validation using `toBeChecked()`.
- **Added assertions** after selecting the `darkColorRadioButton` and `lightColorRadioButton` to confirm the theme actually changed. A short delay was introduced to handle timing issues caused by the page’s rendering behavior.
- **Tested font size adjustments** by navigating to the *Artificial Intelligence* article, since this feature wasn’t available on the homepage. Assertions were added to confirm the selected text size was applied.
- **Added `test.step()` structure** to organize the test into clear, logical steps, improving readability and debugging.

Test cases execution video
https://www.loom.com/share/a3751e0772044d73bcff5d6107a51406?sid=2035f6d5-b167-46a3-b02a-2f58f8a6450e

Project description
https://www.loom.com/share/41bb094b6e444c1f893a8c4de7afc2a9?sid=7b51c59e-ad85-477b-99e8-2ad63da5a84e


## Project Structure

```plaintext
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
├── .env
└── src
    └── lib
        ├── all.test.ts
        ├── login.test.ts
        ├── tests
        │   ├── searchWikipedia.ts
        │   └── wikipediaHomepageActions.ts
    └── auth
        └── login.json
```

## Setup

### Requirements

-   Node.js v22+
-   npm

### Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

#### Run all tests

There's a `test` script in `package.json` so you can do:

```bash
npm run test
```

#### Run a specific test

Add `.only` to the specific test you want to run in isolation in `all.test.ts` and then run the same command:

```bash
npm run test
```

## Need Help?

If you run into any technical issues during the assessment, do your best to unblock yourself. If you really cannot proceed or are done with the task, email megan@ranger.net.
