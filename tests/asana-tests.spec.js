const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test(data.name, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        await page.goto('https://app.asana.com/-/login');
        await page.fill('input[name="e"]', 'ben+pose@workwithloop.com');
        await page.click('.LoginButton');
        await page.fill('input[name="p"]', 'Password123');
        await page.click('.LoginButton');        
      });

      await test.step('Navigate to the correct leftNav item', async () => {
        const navItems = data.leftNav.split(', ');
        for (const item of navItems) {
          await page.click(`.SidebarNavigationLinkCard-label:has-text("${item}")`);
        }
      });

      await test.step('Verify the card is within the "To do" column', async () => {
        console.log(`Checking if card "${data.card_title}" is in column "${data.column}"...`);

        const columnLocator = page.locator(`.BoardColumnHeaderTitle:has-text("${data.column}")`);
        await columnLocator.waitFor({ state: 'visible' });
        console.log(`Column "${data.column}" is visible.`);
    
        const cardLocator = page.locator(`.BoardCard-taskName:has-text("${data.card_title}")`);
        await cardLocator.waitFor({ state: 'visible' });
        console.log(`Card "${data.card_title}" is visible.`);
    
        const isCardInToDoColumn = await columnLocator.isVisible(`.BoardCard-taskName:has-text("${data.card_title}")`);
        console.log(`Card "${data.card_title}" presence in column "${data.column}": ${isCardInToDoColumn}`);
    
        const columnText = await columnLocator.innerText();
        const cardText = await cardLocator.innerText();
        console.log(`Actual column title: ${columnText}`);
        console.log(`Expected column title: ${data.column}`);
        console.log(`Actual card title: ${cardText}`);
        console.log(`Expected column title: ${data.card_title}`);
    
        await expect(isCardInToDoColumn).toBeTruthy();
      });
    });
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
