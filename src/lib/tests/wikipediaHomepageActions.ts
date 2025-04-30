import test, { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 * 6. Assert the page goes dark when the 'Dark' color option is selected
 * 7. Assert the page goes light when the 'Light' color option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */

export async function run(page: Page, params: {}) {
    /** Helper: Wait for and click a radio button */
    const clickRadioButton = async (radioButton, name: string) => {
        console.log(`Clicking the '${name}' radio button...`);
        let retries = 2;
        while (retries > 0) {
            try {
                await radioButton.waitFor({ state: 'visible' });
                await radioButton.click();
                await expect(radioButton).toBeChecked();
                break;
            } catch (error) {
                console.log(`Retrying click for '${name}' radio button...`);
                retries--;
            }
        }
        if (retries === 0) {
            throw new Error(`Failed to click and check '${name}' radio button.`);
        }
    };

    /** Helper: Wait for a specified timeout */
    const waitForDelay = async (ms: number) => {
        console.log(`Waiting for ${ms}ms...`);
        await new Promise((resolve) => setTimeout(resolve, ms));
    };

    await test.step('Navigate to Wikipedia homepage', async () => {
        console.log('Navigating to Wikipedia homepage...');
        await page.goto('https://en.wikipedia.org/wiki/Main_Page');
    });

    await test.step('Check total number of articles in English', async () => {

        console.log('Checking the total number of articles in English...');
        const totalArticlesLink = page.locator("a[title='Special:Statistics']").last(); //No efficient/reliable playwright selector

        await totalArticlesLink.waitFor({ state: 'visible' });

        const articleCountText = await totalArticlesLink.last().textContent();
        if (!articleCountText) {
            throw new Error('Could not get article count text');
        }

        const parsedCount = parseInt(articleCountText.replace(/,/g, ''), 10);
        console.log(`Total articles count: ${parsedCount}`);
        expect(parsedCount).toBeLessThan(7_000_000);

        await totalArticlesLink.last().click();
    });

    await test.step('Change theme to Dark and back to Light', async () => {
        const darkColorRadioButton = page.getByRole('radio', { name: 'Dark' });
        await clickRadioButton(darkColorRadioButton, 'Dark');

        // Add a short delay to ensure the theme is applied
        await waitForDelay(500); // Wait for 500ms

        await expect(darkColorRadioButton).toBeChecked();
        await page.waitForLoadState('domcontentloaded');

        const lightColorRadioButton = page.getByRole('radio', { name: 'Light' });
        await clickRadioButton(lightColorRadioButton, 'Light');

        // Add a short delay to ensure the theme is applied
        await waitForDelay(500); // Wait for 500ms
        await expect(lightColorRadioButton).toBeChecked();

    });

    await test.step('Search for "artificial intelligence"', async () => {
        console.log('Filling the search input field with "artificial"...');
        const searchInputField = page.getByRole('searchbox', { name: 'Search Wikipedia' });
        await searchInputField.waitFor({ state: 'visible' });
        await searchInputField.fill('artificial');

        console.log('Clicking the "Artificial Intelligence" link...');
        const artificialIntelligenceLink = page.getByRole('link', {
            name: 'Artificial intelligence Intelligence of machines',
        });
        await artificialIntelligenceLink.waitFor({ state: 'visible' });
        await artificialIntelligenceLink.click({ force: true });

        // Validate navigation to the Artificial Intelligence page
        await expect(page).toHaveURL(/Artificial_intelligence/);
    });

    await test.step('Change text size to Small, Large, and back to Standard', async () => {
        const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
        await clickRadioButton(smallTextSizeOption, 'Small');
        await waitForDelay(500); // Wait for 500ms
        await expect(smallTextSizeOption).toBeChecked();

        const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
        await clickRadioButton(largeTextSizeOption, 'Large');
        await waitForDelay(500); // Wait for 500ms
        await expect(largeTextSizeOption).toBeChecked();

        const standardTextSizeButton = page.getByLabel('Standard').first();
        console.log('Clicking the "Standard" text size option...');
        await standardTextSizeButton.waitFor({ state: 'visible' });
        await standardTextSizeButton.click();
        await waitForDelay(500); // Wait for 500ms
        await expect(standardTextSizeButton).toBeChecked();
    });
}

