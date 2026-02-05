# ⚡ Browser Blitz Team 05 - Pokemon Index Website

A multi-page Pokemon Index website built with **Vanilla HTML, CSS, and JavaScript** for the Browser Blitz competition.

## 🎯 Challenge Overview

This repository contains a Pokemon-themed website with:
- **8 Functional JavaScript Bugs** (testable with Playwright)
- **12 Visual Red Herrings** (cosmetic issues that don't break functionality)

Participants must fix the 8 functional bugs while ignoring the visual decoys!

---

## 📁 Project Structure

```
browser-blitz-team-05/
├── index.html                  # Home page with hero, features, counter, newsletter
├── pages/
│   ├── pokedex.html           # Pokemon listing with search and filter
│   ├── calculator.html        # Type calculator and damage calculator
│   └── contact.html           # Contact form and FAQ section
├── css/
│   └── style.css              # All styles including visual bugs
├── js/
│   └── main.js                # All JavaScript including functional bugs
├── .hidden-tests/
│   └── bugs.spec.js           # Playwright tests verifying bugs exist
├── package.json               # Dependencies
├── playwright.config.js       # Playwright configuration
└── README.md                  # This file
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npm run install-browsers
```

### 3. Start Local Server

```bash
npm run serve
```

The site will be available at `http://localhost:8080`

### 4. Run Tests

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

---

## 🐛 The 8 Functional Bugs

### BUG 1: Navigation Button - Wrong Path
**Location:** `index.html` + `js/main.js` (line ~20)
**Issue:** The "Explore PokéDex" button navigates to `pokedex.html` instead of `pages/pokedex.html`
**Test:** Clicks button and verifies correct page loads
**Fix:** Change `window.location.href = 'pokedex.html'` to `'pages/pokedex.html'`

### BUG 2: Counter Increment - Wrong Class Selector
**Location:** `js/main.js` (line ~28)
**Issue:** Event listener attached to `.increment-button` but button has class `.increment-btn`
**Test:** Clicks increment button and checks if counter increases
**Fix:** Change `document.querySelector('.increment-button')` to `'.increment-btn'`

### BUG 3: Newsletter Form - Wrong ID
**Location:** `js/main.js` (line ~47)
**Issue:** Event listener attached to `#subscribe-form` but form has id `newsletter-form`
**Test:** Submits form and checks for success message
**Fix:** Change `document.getElementById('subscribe-form')` to `'newsletter-form'`

### BUG 4: Search - Case Sensitive
**Location:** `js/main.js` (line ~82)
**Issue:** Search compares strings without converting to lowercase (case-sensitive)
**Test:** Searches for "pikachu" (lowercase) and expects to find "Pikachu"
**Fix:** Add `.toLowerCase()` to both query and comparison: `p.name.toLowerCase().includes(query.toLowerCase())`

### BUG 5: Type Filter - Wrong Element ID
**Location:** `js/main.js` (line ~111)
**Issue:** Event listener attached to `#pokemon-filter` but select has id `type-filter`
**Test:** Changes filter dropdown and checks if Pokemon list updates
**Fix:** Change `document.getElementById('pokemon-filter')` to `'type-filter'`

### BUG 6: Damage Calculator - String Concatenation
**Location:** `js/main.js` (line ~142)
**Issue:** Adding input values as strings instead of numbers (10 + 20 = "1020" not 30)
**Test:** Enters attack values and verifies correct total
**Fix:** Convert to numbers: `Number(attack1) + Number(attack2) + Number(attack3)` or use `parseInt()`

### BUG 7: Stats Calculator - Wrong Button ID
**Location:** `js/main.js` (line ~153)
**Issue:** Event listener attached to `#calc-stats` but button has id `calculate-stats`
**Test:** Clicks calculate button and checks if result displays
**Fix:** Change `document.getElementById('calc-stats')` to `'calculate-stats'`

### BUG 8: Contact Form - Wrong Form ID
**Location:** `js/main.js` (line ~175)
**Issue:** Event listener attached to `#contact-form-submit` but form has id `contact-form`
**Test:** Submits contact form and checks for success message
**Fix:** Change `document.getElementById('contact-form-submit')` to `'contact-form'`

---

## 🎨 The 12 Visual Red Herrings (Decoys)

These are **cosmetic issues only** - they don't break functionality!

### VISUAL BUG 1-4: Footer Text Alignment
**Location:** `css/style.css` (line ~577)
**Issue:** Footer text aligned to right instead of centered
**Pages:** All pages
**Fix (Optional):** Change `text-align: right` to `text-align: center`

### VISUAL BUG 5: Three Clashing Fonts
**Location:** `contact.html` + `css/style.css` (lines ~466-481)
**Issue:** Comic Sans, Times New Roman, and Courier New used on same page
**Fix (Optional):** Use consistent font-family

### VISUAL BUG 6: Submit Button Color
**Location:** `contact.html` + `css/style.css` (line ~366)
**Issue:** Submit button is warning yellow (#ffc107) instead of success green
**Fix (Optional):** Remove `.warning-color` class or change background

### VISUAL BUG 7: Weird Spacing
**Location:** `contact.html` + `css/style.css` (line ~563)
**Issue:** Excessive gaps and padding in contact info grid
**Fix (Optional):** Reduce gap and padding values

### VISUAL BUG 8: Footer Alignment (Duplicate)
**Location:** All pages
**Issue:** Same as Visual Bugs 1-4

### VISUAL BUG 9: Type Color Inconsistency
**Location:** `css/style.css` (lines ~305-309)
**Issue:** Pokemon type badge colors slightly off from official colors
**Fix (Optional):** Update to official Pokemon type colors

### VISUAL BUG 10: Inconsistent Button Styles
**Location:** `css/style.css` (line ~583)
**Issue:** Odd-numbered buttons have square corners, even have rounded
**Fix (Optional):** Remove nth-child selector for consistent styling

### VISUAL BUG 11: Random Card Color
**Location:** `css/style.css` (line ~588)
**Issue:** Every 3rd Pokemon card has yellow gradient instead of gray
**Fix (Optional):** Remove nth-child selector

### VISUAL BUG 12: Odd Hover Effect
**Location:** `css/style.css` (line ~593)
**Issue:** Second feature card rotates on hover (looks janky)
**Fix (Optional):** Remove rotation from hover transform

### VISUAL BUG 3: Image Overlapping Text
**Location:** `calculator.html` + `css/style.css` (lines ~443-453)
**Issue:** Type chart image overlaps description text with negative margin
**Fix (Optional):** Remove negative margin-top

---

## ✅ Test Results

When running tests on the **broken** code, all 8 functional bug tests should **FAIL**.
After fixing the bugs, all tests should **PASS**.

```bash
# Expected output before fixes:
❌ BUG 1: Explore PokéDex button - FAILED
❌ BUG 2: Counter increment - FAILED
❌ BUG 3: Newsletter form - FAILED
❌ BUG 4: Search case-insensitive - FAILED
❌ BUG 5: Type filter - FAILED
❌ BUG 6: Damage calculator - FAILED
❌ BUG 7: Stats calculator - FAILED
❌ BUG 8: Contact form - FAILED

# Expected output after fixes:
✅ BUG 1: Explore PokéDex button - PASSED
✅ BUG 2: Counter increment - PASSED
✅ BUG 3: Newsletter form - PASSED
✅ BUG 4: Search case-insensitive - PASSED
✅ BUG 5: Type filter - PASSED
✅ BUG 6: Damage calculator - PASSED
✅ BUG 7: Stats calculator - PASSED
✅ BUG 8: Contact form - PASSED
```

---

## 🎮 Theme: Pokemon Index

This website includes:
- **Home Page:** Hero section, features, Pokemon counter, newsletter signup
- **PokéDex Page:** Browse Pokemon with search and type filtering
- **Calculator Page:** Damage calculator and battle power calculator
- **Contact Page:** Contact form with FAQ section

---

## 📝 Tips for Participants

1. **Focus on Functionality:** Ignore visual issues - they're decoys!
2. **Use Browser DevTools:** Check the console for JavaScript errors
3. **Test Each Feature:** Click buttons, submit forms, try the calculators
4. **Read Error Messages:** Playwright tests will guide you to the bugs
5. **One Bug at a Time:** Fix and test each bug individually

---

## 🏆 Competition Rules

- Only fix the **8 functional bugs**
- Do NOT fix the visual red herrings
- All fixes must be in JavaScript - no HTML changes needed
- Use only Vanilla JS - no frameworks allowed
- Run tests to verify your fixes

---

## 📧 Support

For questions about this Browser Blitz challenge, contact the volunteer team or check the competition documentation.

**Good luck, and happy debugging! ⚡**
