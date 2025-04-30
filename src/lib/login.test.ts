import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Main_Page';
const authFile = 'src/auth/login.json';

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */

test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(
            `Missing credentials! Ensure WIKIPEDIA_USERNAME and WIKIPEDIA_PASSWORD are set in your .env file.`
        );
    }

    await test.step('Navigate to Wikipedia main page', async () => {
        console.log('Navigating to Wikipedia main page...');
        await page.goto(WIKIPEDIA_URL);
    });

    await test.step('Click the "Log in" link', async () => {
        console.log('Clicking the "Log in" link...');
        await page.getByRole('link', { name: 'Log in' }).click();
    });

    await test.step('Fill in username and password', async () => {
        console.log('Filling in username and password...');
        await page.getByRole('textbox', { name: 'Username' }).fill(wikipediaUsername);
        await page.getByRole('textbox', { name: 'Password' }).fill(wikipediaPassword);
    });

    await test.step('Submit the login form', async () => {
        console.log('Submitting the login form...');
        await page.getByRole('button', { name: 'Log in' }).click();
    });

    await test.step('Verify login success', async () => {
        console.log('Verifying login success...');
        try {
            await expect(page.getByRole('link', { name: wikipediaUsername })).toBeVisible();
        } catch (error) {
            throw new Error('Login failed: Please check your credentials or network connection.');
        }
    });

    await test.step('Save the logged-in session', async () => {
        console.log('Saving the logged-in session...');
        await page.context().storageState({ path: authFile });
    });
});
