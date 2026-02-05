import { test, expect } from '@playwright/test';

// Base URL for all tests
const BASE_URL = 'http://localhost:8080';

test.describe('Browser Blitz - Pokemon Index - Functional Bug Tests', () => {
  
  // ========================================
  // BUG 1: Navigation Button - Wrong Path
  // ========================================
  test('BUG 1: Explore PokéDex button should navigate to pokedex page', async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`);
    
    // Click the explore button
    await page.click('#explore-btn');
    
    // Wait for navigation
    await page.waitForTimeout(1000);
    
    // Check if we're on the pokedex page
    // BUG: This will fail because the button navigates to 'pokedex.html' instead of 'pages/pokedex.html'
    await expect(page).toHaveURL(`${BASE_URL}/pages/pokedex.html`);
  });

  // ========================================
  // BUG 2: Counter Increment - Wrong Class Selector
  // ========================================
  test('BUG 2: Counter should increment when clicking the catch button', async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`);
    
    // Get initial counter value
    const initialValue = await page.textContent('#counter-value');
    expect(initialValue).toBe('0');
    
    // Click the increment button
    await page.click('.increment-btn');
    
    // Wait a moment for the update
    await page.waitForTimeout(500);
    
    // Check if counter incremented
    const newValue = await page.textContent('#counter-value');
    // BUG: This will fail because the event listener is attached to '.increment-button' (wrong class)
    expect(newValue).toBe('1');
  });

  // ========================================
  // BUG 3: Newsletter Form - Wrong ID
  // ========================================
  test('BUG 3: Newsletter form should show success message on submit', async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`);
    
    // Fill in email
    await page.fill('#email-input', 'test@example.com');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for message
    await page.waitForTimeout(500);
    
    // Check for success message
    const message = await page.textContent('#form-message');
    // BUG: This will fail because the event listener is attached to '#subscribe-form' (wrong ID)
    expect(message).toContain('Thank you for subscribing!');
  });

  // ========================================
  // BUG 4: Search - Case Sensitive
  // ========================================
  test('BUG 4: Search should be case-insensitive', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/pokedex.html`);
    
    // Wait for Pokemon to load
    await page.waitForTimeout(1000);
    
    // Search for "pikachu" in lowercase
    await page.fill('#search-input', 'pikachu');
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Check if results are shown
    const resultsText = await page.textContent('#search-results');
    // BUG: This will fail because search is case-sensitive (looks for "pikachu" but data has "Pikachu")
    expect(resultsText).toContain('Pikachu');
  });

  // ========================================
  // BUG 5: Type Filter - Wrong Element ID
  // ========================================
  test('BUG 5: Type filter should filter Pokemon by type', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/pokedex.html`);
    
    // Wait for Pokemon to load
    await page.waitForTimeout(1000);
    
    // Get initial count of Pokemon cards
    const initialCards = await page.$$('.pokemon-card');
    const initialCount = initialCards.length;
    expect(initialCount).toBeGreaterThan(0);
    
    // Select "fire" type
    await page.selectOption('#type-filter', 'fire');
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Get filtered cards
    const filteredCards = await page.$$('.pokemon-card');
    const filteredCount = filteredCards.length;
    
    // BUG: This will fail because event listener is attached to '#pokemon-filter' (wrong ID)
    // The filter won't work, so count will remain the same
    expect(filteredCount).toBeLessThan(initialCount);
  });

  // ========================================
  // BUG 6: Damage Calculator - String Concatenation
  // ========================================
  test('BUG 6: Damage calculator should add numbers correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/calculator.html`);
    
    // Fill in attack values
    await page.fill('#attack1', '10');
    await page.fill('#attack2', '20');
    await page.fill('#attack3', '30');
    
    // Click calculate button
    await page.click('#calculate-damage');
    
    // Wait for calculation
    await page.waitForTimeout(500);
    
    // Check total damage
    const total = await page.textContent('#total-damage');
    // BUG: This will fail because it uses string concatenation (result will be "102030" instead of "60")
    expect(total).toBe('60');
  });

  // ========================================
  // BUG 7: Stats Calculator - Wrong Button ID
  // ========================================
  test('BUG 7: Stats calculator should calculate battle power', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/calculator.html`);
    
    // Set values
    await page.fill('#base-power', '100');
    await page.fill('#level', '50');
    await page.selectOption('#multiplier', '2');
    
    // Click calculate button
    await page.click('#calculate-stats');
    
    // Wait for calculation
    await page.waitForTimeout(500);
    
    // Check battle power (100 * (50/10) * 2 = 1000)
    const battlePower = await page.textContent('#battle-power');
    // BUG: This will fail because event listener is attached to '#calc-stats' (wrong ID)
    expect(parseInt(battlePower)).toBeGreaterThan(0);
  });

  // ========================================
  // BUG 8: Contact Form - Wrong Form ID
  // ========================================
  test('BUG 8: Contact form should show success message on submit', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/contact.html`);
    
    // Fill in form
    await page.fill('#name', 'Ash Ketchum');
    await page.fill('#email', 'ash@pokemon.com');
    await page.fill('#subject', 'Question about PokéDex');
    await page.fill('#message', 'How do I catch them all?');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for message
    await page.waitForTimeout(500);
    
    // Check for success message
    const message = await page.textContent('#contact-message');
    // BUG: This will fail because event listener is attached to '#contact-form-submit' (wrong ID)
    expect(message).toContain('Thank you');
  });

});

// ========================================
// ADDITIONAL UTILITY TESTS
// ========================================

test.describe('Utility Tests - Verify Site Structure', () => {
  
  test('All pages should load successfully', async ({ page }) => {
    const pages = [
      `${BASE_URL}/index.html`,
      `${BASE_URL}/pages/pokedex.html`,
      `${BASE_URL}/pages/calculator.html`,
      `${BASE_URL}/pages/contact.html`
    ];
    
    for (const url of pages) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    }
  });

  test('Navigation links should exist on all pages', async ({ page }) => {
    const pages = [
      `${BASE_URL}/index.html`,
      `${BASE_URL}/pages/pokedex.html`,
      `${BASE_URL}/pages/calculator.html`,
      `${BASE_URL}/pages/contact.html`
    ];
    
    for (const url of pages) {
      await page.goto(url);
      const navLinks = await page.$$('.nav-links a');
      expect(navLinks.length).toBe(4);
    }
  });

  test('Pokemon data should load on PokéDex page', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/pokedex.html`);
    await page.waitForTimeout(1000);
    
    const pokemonCards = await page.$$('.pokemon-card');
    expect(pokemonCards.length).toBeGreaterThan(0);
  });

});
