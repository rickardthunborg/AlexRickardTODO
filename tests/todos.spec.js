// @ts-check
const { test, expect } = require('@playwright/test');

test('add todo', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/');

  let input = await page.locator('#todo-title');

  await input.type('Clean kitchen');
  await page.keyboard.press('Enter')

  let todoTitle = await page.textContent('.todo-item p')

  await expect(todoTitle).toEqual('Clean kitchen')
});

test('1 item left', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/');

  let input = await page.locator('#todo-title');

  await input.type('Random todo');
  await page.keyboard.press('Enter');

  let itemsLeft = await page.textContent('#itemsLeft');

  await expect(itemsLeft).toEqual('1 item left');

  let checkbox = await page.locator('.check-done');

  await checkbox.click();

  itemsLeft = await page.textContent('#itemsLeft');

  await expect(itemsLeft).toEqual('0 items left');


});

test('2 items left', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/');

  let input = await page.locator('#todo-title');

  await input.type('Clean kitchen');
  await page.keyboard.press('Enter')

  await input.type('Eat food');
  await page.keyboard.press('Enter')

  await input.type('Feed dog');
  await page.keyboard.press('Enter')

  let checkbox = await page.locator('.check-done').last();
  
  await checkbox.click();

  let itemsLeft = await page.textContent('#itemsLeft');
  
  await expect(itemsLeft).toEqual('2 items left')
});
