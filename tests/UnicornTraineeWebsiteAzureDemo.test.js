import { test, expect, chromium } from '@playwright/test';
const credentials = require('../data/credentials');  
// const sleepms = require('../commonfunctions/sleepfunction');  
test('basic test', async ({ page }) => {
await page.goto("https://trainee-web-app.azurewebsites.net/auth/login");

await page.waitForSelector("#inputUserName");
//Login module
await page.click("#inputUserName");
const email = credentials.users[0].username;
const password = credentials.users[0].password;
// await page.type('input[id="inputUserName"]', "test@test.com");ṅ
await page.type('input[id="inputUserName"]', email);
await page.waitForSelector('input[id="inputPassword"]');
await page.type('input[id="inputPassword"]', password);
await page.waitForSelector('button[class="btn btn-lg btn-block text-white mt-5 primary-btn"]');
const alertnotify = "div:nth-child(3) > div";
await page.click('button[class="btn btn-lg btn-block text-white mt-5 primary-btn"]');
//Make a new deal Modal
await page.waitForSelector('input[id="address"]');
await page.type('input[id="address"]', "23,South Avenue Street,NY,USA");
await page.waitForSelector('input[id="fileNumber"]');
await page.type('input[id="fileNumber"]', "762347624");
//Click to create new deal
await page.waitForSelector(' button[class="btn btn-primary ml-3 primary-btn"]');
await page.click(' button[class="btn btn-primary ml-3 primary-btn"]');
//Go home and check the new deal is created or not
await page.waitForSelector("app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
await page.click("app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
//open newly created deal out of exsiting deals
await page.waitForSelector("app-file-card:nth-child(3) > div > div > a");
await page.click("app-file-card:nth-child(3) > div > div > a");
await page.waitForSelector("//*[@class='btn btn-primary primary-btn']");
await page.click("//*[@class='btn btn-primary primary-btn']");
await page.waitForSelector('input[id="address"]');
await page.type('input[id="address"]', "2004,nyati elan phs1,Bk,wagholi");
await page.waitForSelector('(//*[@id="fileNumber"])[2]');
await page.type('(//*[@id="fileNumber"])[2]', "11223344");
//Click to create new deal
await page.waitForSelector(' button[class="btn btn-primary ml-3 primary-btn"]');
await page.click(' button[class="btn btn-primary ml-3 primary-btn"]');
//Go home and check the new deal is created or not
await page.waitForSelector( "app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
await page.click("app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
sleepms.sleep(10000); 
// page.pause();

});