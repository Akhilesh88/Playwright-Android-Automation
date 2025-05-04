const puppeteer = require("puppeteer");
// import puppeteer from "puppeteer"
const credentials = require("../data/credentials");  
// const { user } = require("jest/user-event");
const { addAttach } = require("jest-html-reporters/helper");  //To add the addattach feature inside the html report
// const userEvent =require("@testing-library/user-event");
describe( "Deal test",() => {
  
  it(" Deal test file upload ", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 150
      });
  const page = await browser.newPage();

  await page.goto("https://trainee-web-app.azurewebsites.net/auth/login");

  await page.waitForSelector("#inputUserName");
  //Login module
  await page.click("#inputUserName");
  const email = credentials.users[0].username;
  const password = credentials.users[0].password;
  // await page.type('input[id="inputUserName"]', "test@test.com");
  await page.type('input[id="inputUserName"]', email);

  await page.waitForSelector('input[id="inputPassword"]');
  await page.type('input[id="inputPassword"]', password);
  await page.waitForSelector('button[class="btn btn-lg btn-block text-white mt-5 primary-btn"]');
  const alertnotify="div:nth-child(3) > div"
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
  await page.waitForSelector("app-sidenav > div > div > a:nth-child(1)>.menu-item-text" );
  await page.click("app-sidenav > div > div > a:nth-child(1)>.menu-item-text");
  await page.waitForSelector("app-file-card:nth-child(2) > div > div > a" );
  await page.hover("app-file-card:nth-child(1) > div > div > a");
  await page.hover("app-file-card:nth-child(2) > div > div > a");
  //open newly created deal out of exsiting deals
  await page.waitForSelector('app-file-card:nth-child(3) > div > div > a');
  await page.click('app-file-card:nth-child(3) > div > div > a');
//   #disclosureType    its for drop down for the dropdown menu which different types of the building types

//Selects the drop down of construction category resedential or commerical types
let ele1=await page.$('div:nth-child(1) > div:nth-child(2) > ng-select');
const element = await page.$('div:nth-child(1) > div:nth-child(2) > ng-select');
await page.waitForSelector(' div:nth-child(1) > div:nth-child(2) > ng-select');
await page.click('div:nth-child(1) > div:nth-child(2) > ng-select');
// userEvent.hover(ele1);
// #a959b1b09051-4 > span
await page.waitForSelector('span[ng-reflect-ng-item-label="Commercial Office Space"]');
await page.hover('span[ng-reflect-ng-item-label="Commercial Office Space"]');
await page.click('span[ng-reflect-ng-item-label="Commercial Office Space"]');
console.log("Hover action is Successful!!");
await page.click('div:nth-child(1) > div:nth-child(2) > ng-select');
//write a logic to hover over the Element.
// userEvent.hover()
// Commercial Office Space select out of 5 options
await page.waitForSelector('span[ng-reflect-ng-item-label="Commercial Office Space"]');
await page.click('span[ng-reflect-ng-item-label="Commercial Office Space"]');

//date picker logic
// #closingDate
await page.waitForSelector('#closingDate');
await page.click('#closingDate');
await page.click('tr:nth-child(3) > td:nth-child(6) > span');


const [filechooser]=await Promise.all([
    page.waitForFileChooser(),
    page.click('.custom-upload')
  ]);
  await filechooser.accept(['C:/Users/akhilesh.behera/Pictures/capture.png']);
  const data = await page.screenshot({
    path: "./screenshots/screenshotfileupload.jpeg",
  });
  console.log('Pic upload success!!!');
  
  await addAttach({
                attach: data,
                description:'screenshot upload Success!!',             
             });
await page.waitForSelector('div.d-flex.justify-content-center.mt-5 > input');
await page.click('div.d-flex.justify-content-center.mt-5 > input');            
await page.waitForSelector('div > button.btn.btn-primary.mx-2.submit-btn');
await page.click('div > button.btn.btn-primary.mx-2.submit-btn');      
console.log('submit of the deal after the successfull upload of the photo');
await page.waitForSelector('div > button.btn.btn-primary.mt-3.d-btn');
await page.click('div > button.btn.btn-primary.mt-3.d-btn');   
console.log("File download success!!");
//   await browser.close();
await page.keyboard.press('ControlLeft');
await page.keyboard.press('KeyJ');
await page.keyboard.up('ControlLeft');
},50000);
});


