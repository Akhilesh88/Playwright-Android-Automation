import { _android as android, } from 'playwright';
import { test } from "@playwright/test";
// const credentials = require("../data/credentials");  //Credentails for login
test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    testInfo.setTimeout(testInfo.timeout + 30000);
  });
test("Run in Android - Chrome", async () => {
    // Connect to the device.
    test.setTimeout(120000); // Set timeout to 2 minutes
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);  // Get device model
    console.log(`Serial: ${device.serial()}`);// Get device serial number
    // Take screenshot of the device.
    await device.screenshot({ path: 'device.png' }); 

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome'); // Force stop Chrome to make sure it is not running
    const context = await device.launchBrowser();  //Laucnh the browser
   // Use BrowserContext as usual.
    const page = await context.newPage();  //open the new page
    // Set user agent to mobile
    await page.goto('https://polarisxchange.com/'); //open website
    console.log(await page.evaluate(() => window.location.href));
    await page.waitForSelector('div.site-header.container.container--wide > button');
    await page.click(' div.site-header.container.container--wide > button');
    //sell and trade button in menu hamburger icon
    await page.waitForSelector('.padding-none > nav > ul > li:nth-child(2) > a');
    await page.click('.padding-none > nav > ul > li:nth-child(2) > a');
    //For menu button 
    await page.waitForSelector('div.site-header.container.container--wide > button');
    await page.click('div.site-header.container.container--wide > button');
    //For shop click on menu button
    await page.waitForSelector(`(//*[@class='mobile-nav__item'])[1]//button`);
    await page.click(`(//*[@class='mobile-nav__item'])[1]//button`);
    await context.close();  // it will close the browser context
    const contextscreen = await device.screenshot({ path: 'websitescreenshot.png' });
    await device.close();  //it will close the device
})
