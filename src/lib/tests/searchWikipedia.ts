import { Page, expect, test } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Switch the language to Spanish and confirm the page was updated
 * 4. Switch the language to French and confirm the page was updated
 * 5. Click "View history"
 * 6. Assert that the latest edit was made by the user "ElegantEgotist"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Worstbull" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */

export async function run(page: Page, params: {}) {
    /** Helper: Ensure dropdown is visible */
    const ensureDropdownVisible = async () => {
        const languageDropdownButton = page.locator('#p-lang-btn');
        const languageDropdownWindow = page.locator('.uls-filterinput.uls-filtersuggestion');

        console.log('Waiting for the dropdown button to be visible...');
        await languageDropdownButton.waitFor({ state: 'visible' });
        await expect(languageDropdownButton).toBeVisible();

        try {
            console.log('Waiting for the dropdown window to become visible...');
            await languageDropdownButton.click({ force: true });
            await languageDropdownWindow.waitFor({ state: 'visible', timeout: 500 });
        } catch (error) {
            console.log('Dropdown window not visible, retrying...');
            await languageDropdownButton.click({ force: true });
            await languageDropdownWindow.waitFor({ state: 'visible', timeout: 500 });
            await expect(languageDropdownWindow).toBeVisible();

        }
    };

    /** Helper: Select a language */
    const selectLanguage = async (languageName: string) => {
        console.log(`Selecting language: ${languageName}`);
        const languageSearchBox = page.getByRole('textbox', {
            name: /Search for a language|Buscar un idioma|Rechercher une langue/,
        });
        await languageSearchBox.waitFor({ state: 'visible' });
        await expect(languageSearchBox).toBeVisible();
        await languageSearchBox.fill(languageName);
        const languageLink = page.getByRole('link', { name: languageName });
        await languageLink.first().click();
    };

    /** Helper: Verify language change */
    const verifyLanguageChange = async (expectedLang: string) => {
        const pageLang = await page.locator('html').getAttribute('lang');
        console.log(`Page language: ${pageLang}`);
        expect(pageLang).toBe(expectedLang);
    };

    await test.step('Navigate to Wikipedia homepage', async () => {
        console.log('Navigating to Wikipedia homepage...');
        await page.goto('https://www.wikipedia.org/');
    });

    await test.step('Search for "Artificial Intelligence"', async () => {
        console.log('Searching for "Artificial Intelligence"...');
        const searchInputField = page.getByRole('searchbox', { name: 'Search Wikipedia' });
        await searchInputField.fill('artificial');
        const artificialIntelligenceLink = page.getByRole('link', {
            name: 'Artificial intelligence Intelligence of machines',
        });
        await artificialIntelligenceLink.click({ force: true });
    });

    await test.step('Switch to Spanish', async () => {
        console.log('Switching to Spanish...');
        await ensureDropdownVisible();
        await selectLanguage('Español');
        await verifyLanguageChange('es');
    });

    await test.step('Switch to French', async () => {
        console.log('Switching to French...');
        await ensureDropdownVisible();
        await selectLanguage('Français');
        await verifyLanguageChange('fr');
    });

    await test.step('Switch to English', async () => {
        console.log('Switching to English...');
        await ensureDropdownVisible();
        await selectLanguage('English');
        await verifyLanguageChange('en');
    });

    await test.step('Verify page history', async () => {
        console.log('Verifying page history...');
        const viewHistory = page.locator('#ca-history');
        await viewHistory.waitFor({ state: 'visible' });
        await expect(viewHistory).toBeVisible();

        await viewHistory.click();

        const pageHistoryList = page.locator('#pagehistory .mw-contributions-list');
        await pageHistoryList.first().waitFor({ state: 'visible' });
        await expect(pageHistoryList.first()).toBeVisible();


        const lastEditor = await pageHistoryList.locator('.history-user').first().textContent();
        console.log('Last editor:', lastEditor);
        expect(lastEditor?.trim()).toContain('ElegantEgotist talk contribs');
    });
}

