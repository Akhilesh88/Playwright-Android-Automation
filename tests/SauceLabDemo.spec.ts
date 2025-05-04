import { test, expect } from "@playwright/test";
import { listenerCount, title } from "process";

test("has title", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");
  // Step-1 login into saucedemo and pick username and password with automation 
  //Fetch locator username values
  // let  user=await page.locator('//*[@id="login_credentials"]/h4/text()[1]').innerText();
  // let user= await page.locator('//*[@id="login_credentials"]',{has:page.locator("//text[text()='standard_user']")}).innerText(); 
  // console.log(user);
  const usernameList = await page.locator('#login_credentials').innerText();  
  const splittedUsernameList=usernameList.split("\n",6);
  console.log("Username after extraction is->",splittedUsernameList[1]);    
  const passwordText = await page.locator('div.login_password').innerText();
  const splittedPassword=passwordText.split("\n",6);
  console.log("Username after extraction is->",splittedPassword[1]);
  // await page.locator("#user-name").fill("standard_user");
  await page.locator("#user-name").fill(splittedUsernameList[1]);
  // await page.locator("#user-name").fill(user);
    await page.click("#password");
    // let  pwd=await page.locator('/html/body/div[2]/div[2]/div/div[2]/text()').innerText();
  // await page.locator("#password").fill("secret_sauce");
  await page.locator("#password").fill(splittedPassword[1]);
  // await page.locator("#password").fill(pwd);
  await page.click("#login-button");
  // step-2 use expect to count no of add to cart button
  const count = await page.locator(".inventory_item").count();
  console.log(" No of Add to cart Item Available:" + count);
  //Write the sort command for sorting price low to high in Sauce lab demo website.
  await page.waitForSelector('.product_sort_container');
  await page.click('.product_sort_container');
 /* // const comp=await page.locator("//*[text()='Price (low to high)']");*/

  const element=await page.locator('.product_sort_container');
  element.selectOption('Price (low to high)');
  await page.click('.product_sort_container');
let prices: number[] = [];
let list1: String[] = [];
// let list2: String = [];
// let price: Number = [];
  // let itemPrice;
var itemPrice: string;
  // for(let i=0;i<2;i++){
  for (let i = 0; i < count; i++) {
    const itemPricePromise = page.locator(`div:nth-child(${i + 1}) > div.pricebar > div`).innerText();
    itemPrice = await itemPricePromise;
    list1 = list1.concat(itemPrice);
 
  }
  console.log(list1);
//     console.log(list);
function isAscending(prices: number[]): boolean {
    console.log(prices.length);
    for (let i = 0; i < 6; i++) {
      if (prices[i] < prices[i - 1]) {
        return false;
      }
    }
    return true;
  }

  function isDescending(prices: number[]): boolean {
    for (let i = 0; i < 6; i++) {
      if (prices[i] > prices[i - 1]) {
        return false;
      }
    }
    return true;
  }

  // const ascendingPrices = [7.99,9.99,15.99,29.99, 49.99];
  // const descendingPrices =[49.99, 29.99, 15.99, 9.99,7.99];
  for (let priceStr of list1) {
    const price = parseFloat(priceStr.replace("$", ""));
    prices.push(price);
  }
  console.log(prices); 
  console.log("Ascending Cart Items Price:");
  console.log(isAscending(prices)); // Output: true
  prices.reverse();
  console.log(prices);
  console.log("Descending Cart Items Price:");
  console.log(isDescending(prices)); // Output: true
 /* // Parse the input prices and store them in the `prices` array
  // Now you can use the `prices` array for sorting or other operations
  // console.log(prices); // Output: [29.99, 9.99, 15.99, 49.99, 7.99, 15.99]
  // prices.reverse();
  // console.log(prices);*/
//Add to cart Functionality 

await page.click("#inventory_container > div > div:nth-child(1) > div.pricebar > button");
await page.click("#inventory_container > div > div:nth-child(2) > div.pricebar > button");
await page.click("#inventory_container > div > div:nth-child(3) > div.pricebar > button");
await page.click("#shopping_cart_container>a");
await page.click("a.btn_action.checkout_button");
await page.click("#first-name");
await page.locator("#first-name").fill("John");
// await page.click("#last-name");
await page.locator("#last-name").fill("Doe");
await page.click("#postal-code");
await page.locator("#postal-code").fill("123,93 Avenue,Ny,USA");
// await page.waitForTimeout(2000);

await page.click("//*[@id='checkout_info_container']/div/form/div[2]/input");
await page.click('//*[@id="checkout_summary_container"]/div/div[2]/div[8]/a[2]');
await page.waitForTimeout(3000);
let ordert =await page.locator('#checkout_complete_container > h2').innerText();

const oderm="THANK YOU FOR YOUR ORDER";
expect(ordert).toEqual(oderm)
console.log("Order Placement was success!! /n Thank You!!")

// }
});
