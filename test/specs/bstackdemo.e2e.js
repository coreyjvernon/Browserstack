describe('BrowserStack Demo Test', () => {
    it('should log in, filter, favorite, and verify', async () => {
        // Step 1: Navigate to homepage
        await browser.url('/');

        // Step 2: Click Login
        const loginBtn = await $('//*[@id="signin"]');
        await loginBtn.waitForExist({ timeout: 20000 });
        await loginBtn.click();

        // Step 3: Login flow using dropdowns (desktop + mobile-safe)
        const capabilities = await browser.capabilities;
        const isMobile = capabilities.deviceName !== undefined;

        // Use dropdown selectors for all devices
        const usernameDropdown = await $('//div[text()="Select Username"]');
        await usernameDropdown.waitForDisplayed({ timeout: 10000 });
        await usernameDropdown.click();

        const demouserOption = await $('//div[text()="demouser"]');
        await demouserOption.waitForDisplayed({ timeout: 10000 });
        await demouserOption.click();

        const passwordDropdown = await $('//div[text()="Select Password"]');
        await passwordDropdown.waitForDisplayed({ timeout: 10000 });
        await passwordDropdown.click();

        const passwordOption = await $('//div[text()="testingisfun99"]');
        await passwordOption.waitForDisplayed({ timeout: 10000 });
        await passwordOption.click();

        // Retry dropdown selection for Android if it silently failed
        if (isMobile) {
            try {
                const selectedUsername = await $('//div[contains(@class, "css-1uccc91-singleValue") and contains(text(), "demouser")]');
                const isUsernameSelected = await selectedUsername.isExisting();

                if (!isUsernameSelected) {
                    console.log('Re-selecting dropdowns for mobile fallback');

                    await usernameDropdown.click();
                    await browser.execute("arguments[0].click();", demouserOption);

                    await passwordDropdown.click();
                    await browser.execute("arguments[0].click();", passwordOption);
                }
            } catch (error) {
                console.warn('Mobile login fallback failed:', error.message);
            }
        };

        // Step 4: Wait for login to complete
        //await browser.pause(2000); // can also use waitUntil with profile icon
  
        if (isMobile) {
            try {
                // Wait for the dropdown option menu to disappear
                const dropdownOptions = await $$('div[class*="option"]');
                await browser.waitUntil(
                    async () => {
                        return (await Promise.all(dropdownOptions.map(async opt => !(await opt.isDisplayed())))).every(v => v === true);
                    },
                    {
                        timeout: 5000,
                        timeoutMsg: 'Dropdown options are still visible after selection'
                    }
                );
            } catch (error) {
                console.warn('Dropdown did not disappear cleanly:', error.message);
            }
        };
        const loginSubmit = await $('#login-btn');
        await loginSubmit.scrollIntoView();
        await loginSubmit.waitForClickable({ timeout: 10000 });
        await loginSubmit.click();


        // Step 5: Filter for Samsung
        const samsungFilter = await $('//label[contains(., "Samsung")]/span[@class="checkmark"]');
        await samsungFilter.waitForDisplayed({ timeout: 10000 });
        await samsungFilter.click();

        await browser.pause(2000); // Wait for products to update

        // Favorite Galaxy S20+
        const favoriteButton = await $('//p[text()="Galaxy S20+"]/ancestor::div[contains(@class,"shelf-item")]//button');
        await favoriteButton.scrollIntoView({block: 'center'});
        await favoriteButton.waitForClickable({ timeout: 10000 });
      //  await favoriteButton.click();
        await browser.execute("arguments[0].click();", favoriteButton);
        // Step 7: Go to Favorites
        const favBtn = await $('#favourites');
        await favBtn.click();

        // Step 8: Verify Galaxy S20+ is listed
        const favItem = await $('//p[text()="Galaxy S20+"]');
        const isDisplayed = await favItem.isDisplayed();

        expect(isDisplayed).toBe(true);
    });
});
