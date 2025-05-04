import { _android as android, } from 'playwright';
import { test } from "@playwright/test";
const credentials = require("../data/credentials");
test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    testInfo.setTimeout(testInfo.timeout + 30000);
  });
test("Run in Android - Chrome", async () => {
    // Connect to the device.
    test.setTimeout(120000);
    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);
    // Take screenshot of the device.
    await device.screenshot({ path: 'device.png' });

    // Launch Chrome browser.
    await device.shell('am force-stop com.android.chrome');
    const context = await device.launchBrowser();

    // Use BrowserContext as usual.
    const page = await context.newPage();
    // await page.goto('https://en.m.wikipedia.org/wiki/Main_Page');
    await page.goto('https://trainee-web-app.azurewebsites.net/auth/login');
    console.log(await page.evaluate(() => window.location.href));
    // await page.screenshot({ path: 'page.png' });
    // await page.waitForSelector('input[id="inputUserName"]');
    // //Login module
    // await page.click('input[id="inputUserName"]');
    const email = credentials.users[0].username;
    const password = credentials.users[0].password;
    await page.fill('input[id="inputUserName"]', email);

    await page.waitForSelector('input[id="inputPassword"]');
    await page.click('input[id="inputPassword"]');
    await page.fill('input[id="inputPassword"]', password);
    await page.waitForSelector('button[class="btn btn-lg btn-block text-white mt-5 primary-btn"]');
    const alertnotify = "div:nth-child(3) > div";
    await page.press('input[id="inputPassword"]', 'Tab');
    await page.click('button[class="btn btn-lg btn-block text-white mt-5 primary-btn"]');
    //Make a new deal Modal
    await page.waitForSelector('input[id="address"]');
    await page.fill('input[id="address"]', "23,South Avenue Street,NY,USA");
    await page.waitForSelector('input[id="fileNumber"]');
    await page.fill('input[id="fileNumber"]', "762347624");
   //Click to create new deal
   await page.waitForSelector(' button[class="btn btn-primary ml-3 primary-btn"]');
   await page.click(' button[class="btn btn-primary ml-3 primary-btn"]');
   //Go home and check the new deal is created or not
//    await page.waitForSelector("app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
//    await page.click("app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
//    await page.waitForSelector("app-file-card:nth-child(2) > div > div > a");
//    await page.hover("app-file-card:nth-child(1) > div > div > a");
//    await page.hover("app-file-card:nth-child(2) > div > div > a");
   //open newly created deal out of exsiting deals
//    await page.waitForSelector("app-file-card:nth-child(3) > div > div > a");
//    await page.click("app-file-card:nth-child(3) > div > div > a");
   //cash only or cash+finance transaction type.

//    await page.waitForSelector("(//*[@class='form-check-label'])[2]");
//    await page.click("(//*[@class='form-check-label'])[2]");
//     await Promise.all([
//         page.waitForNavigation({ url: 'https://letcode.in/' }),
//         page.click('//button[normalize-space(.)=\'LOGIN\']')
// //     ]);
//     await page.click("a[role='button']");
//     await page.click("text=Sign out");
await page.waitForSelector("//*[@class='profile-icon']/span");
await page.click("//*[@class='profile-icon']/span");

//logout functionality of website 
await page.waitForSelector("//*[@class='logout-text']");
await page.click("//*[@class='logout-text']");
    // close context and device
    await context.close();
    const contextscreen = await device.screenshot({ path: 'websitescreenshot.png' });
    await device.close();
})
