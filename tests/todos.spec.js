// @ts-check
const { test, expect } = require('@playwright/test');

test('add todo', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let input = await page.locator('#todo-title');

  await input.type('Clean kitchen');
  await page.keyboard.press('Enter')

  let todoTitle = await page.textContent('.todo-item p')

  await expect(todoTitle).toEqual('Clean kitchen')
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
