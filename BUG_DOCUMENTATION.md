# 🐛 Bug Documentation for Volunteers

This document provides detailed information about each bug for the volunteer team creating this Browser Blitz challenge.

---

## Functional Bugs (8 Total)

### 🔴 BUG 1: Navigation Button Path Error

**Category:** Navigation  
**Severity:** High  
**Page:** index.html  
**Code Location:** js/main.js, lines 16-23

**The Bug:**
```javascript
// BROKEN CODE:
window.location.href = 'pokedex.html';

// CORRECT CODE:
window.location.href = 'pages/pokedex.html';
```

**Why It Breaks:**
- The button tries to navigate to `pokedex.html` in the root directory
- The actual file is located at `pages/pokedex.html`
- Results in 404 error / page not found

**How to Test:**
1. Open index.html in browser
2. Click "Explore PokéDex" button
3. Page will fail to load (404 error)

**Playwright Test:**
```javascript
await page.click('#explore-btn');
await expect(page).toHaveURL(`${BASE_URL}/pages/pokedex.html`);
// FAILS because actual URL would be /pokedex.html (404)
```

---

### 🔴 BUG 2: Counter - Wrong Class Selector

**Category:** Event Listener  
**Severity:** High  
**Page:** index.html  
**Code Location:** js/main.js, line 28

**The Bug:**
```javascript
// BROKEN CODE:
const incrementBtn = document.querySelector('.increment-button');

// HTML HAS:
<button class="increment-btn">Catch Pokemon (+1)</button>

// CORRECT CODE:
const incrementBtn = document.querySelector('.increment-btn');
```

**Why It Breaks:**
- JavaScript looks for class `.increment-button`
- HTML has class `.increment-btn`
- Selector returns `null`, no event listener attached

**How to Test:**
1. Go to homepage
2. Click "Catch Pokemon (+1)" button
3. Counter stays at 0 (doesn't increment)

**Playwright Test:**
```javascript
await page.click('.increment-btn');
const newValue = await page.textContent('#counter-value');
expect(newValue).toBe('1');
// FAILS because button doesn't work
```

---

### 🔴 BUG 3: Newsletter Form - Wrong ID

**Category:** Event Listener  
**Severity:** High  
**Page:** index.html  
**Code Location:** js/main.js, line 47

**The Bug:**
```javascript
// BROKEN CODE:
const newsletterForm = document.getElementById('subscribe-form');

// HTML HAS:
<form id="newsletter-form">

// CORRECT CODE:
const newsletterForm = document.getElementById('newsletter-form');
```

**Why It Breaks:**
- JavaScript looks for `#subscribe-form`
- HTML has `#newsletter-form`
- Form submission not prevented, page reloads instead

**How to Test:**
1. Enter email in newsletter form
2. Click "Subscribe" button
3. Page reloads instead of showing success message

**Playwright Test:**
```javascript
await page.fill('#email-input', 'test@example.com');
await page.click('button[type="submit"]');
const message = await page.textContent('#form-message');
expect(message).toContain('Thank you');
// FAILS because form handler not attached
```

---

### 🔴 BUG 4: Search - Case Sensitive

**Category:** Logic Error  
**Severity:** Medium  
**Page:** pages/pokedex.html  
**Code Location:** js/main.js, lines 82-87

**The Bug:**
```javascript
// BROKEN CODE:
const query = searchInput.value; // No toLowerCase()
const results = pokemonData.filter(p => p.name.includes(query));

// CORRECT CODE:
const query = searchInput.value.toLowerCase();
const results = pokemonData.filter(p => 
    p.name.toLowerCase().includes(query)
);
```

**Why It Breaks:**
- Search looks for exact case matches
- Data has "Pikachu" (capital P)
- Searching "pikachu" returns no results

**How to Test:**
1. Go to PokéDex page
2. Type "pikachu" (lowercase) in search
3. Gets "No Pokemon found" (should find Pikachu)
4. Type "Pikachu" (capital P) - works correctly

**Playwright Test:**
```javascript
await page.fill('#search-input', 'pikachu');
const resultsText = await page.textContent('#search-results');
expect(resultsText).toContain('Pikachu');
// FAILS because case-sensitive comparison
```

---

### 🔴 BUG 5: Type Filter - Wrong Element ID

**Category:** Event Listener  
**Severity:** High  
**Page:** pages/pokedex.html  
**Code Location:** js/main.js, line 111

**The Bug:**
```javascript
// BROKEN CODE:
const typeFilter = document.getElementById('pokemon-filter');

// HTML HAS:
<select id="type-filter">

// CORRECT CODE:
const typeFilter = document.getElementById('type-filter');
```

**Why It Breaks:**
- JavaScript looks for `#pokemon-filter`
- HTML has `#type-filter`
- Filter dropdown doesn't work

**How to Test:**
1. Go to PokéDex page
2. Change type filter dropdown
3. Pokemon list doesn't update (no filtering happens)

**Playwright Test:**
```javascript
await page.selectOption('#type-filter', 'fire');
const filteredCards = await page.$$('.pokemon-card');
// FAILS because filter doesn't work
```

---

### 🔴 BUG 6: Calculator - String Concatenation

**Category:** Data Type Error  
**Severity:** High  
**Page:** pages/calculator.html  
**Code Location:** js/main.js, line 142

**The Bug:**
```javascript
// BROKEN CODE:
const total = attack1 + attack2 + attack3;
// If inputs are "10", "20", "30", result is "102030" (string concat)

// CORRECT CODE:
const total = Number(attack1) + Number(attack2) + Number(attack3);
// Result would be 60 (numeric addition)
```

**Why It Breaks:**
- Input values are strings by default
- `+` operator concatenates strings instead of adding numbers
- 10 + 20 + 30 = "102030" not 60

**How to Test:**
1. Go to Calculator page
2. Enter Attack 1: 10, Attack 2: 20, Attack 3: 30
3. Click "Calculate Total Damage"
4. Shows "102030" instead of "60"

**Playwright Test:**
```javascript
await page.fill('#attack1', '10');
await page.fill('#attack2', '20');
await page.fill('#attack3', '30');
await page.click('#calculate-damage');
const total = await page.textContent('#total-damage');
expect(total).toBe('60');
// FAILS because result is "102030"
```

**Classic JavaScript Gotcha!** This is one of the most common bugs in vanilla JS.

---

### 🔴 BUG 7: Stats Calculator - Wrong Button ID

**Category:** Event Listener  
**Severity:** High  
**Page:** pages/calculator.html  
**Code Location:** js/main.js, line 153

**The Bug:**
```javascript
// BROKEN CODE:
const calculateStatsBtn = document.getElementById('calc-stats');

// HTML HAS:
<button id="calculate-stats">

// CORRECT CODE:
const calculateStatsBtn = document.getElementById('calculate-stats');
```

**Why It Breaks:**
- JavaScript looks for `#calc-stats`
- HTML has `#calculate-stats`
- Button doesn't work

**How to Test:**
1. Go to Calculator page
2. Scroll to Stats Calculator
3. Enter values and click "Calculate Battle Power"
4. Nothing happens (result stays 0)

**Playwright Test:**
```javascript
await page.click('#calculate-stats');
const battlePower = await page.textContent('#battle-power');
expect(parseInt(battlePower)).toBeGreaterThan(0);
// FAILS because button doesn't work
```

---

### 🔴 BUG 8: Contact Form - Wrong Form ID

**Category:** Event Listener  
**Severity:** High  
**Page:** pages/contact.html  
**Code Location:** js/main.js, line 175

**The Bug:**
```javascript
// BROKEN CODE:
const contactForm = document.getElementById('contact-form-submit');

// HTML HAS:
<form id="contact-form">

// CORRECT CODE:
const contactForm = document.getElementById('contact-form');
```

**Why It Breaks:**
- JavaScript looks for `#contact-form-submit`
- HTML has `#contact-form`
- Form submission not prevented, page reloads

**How to Test:**
1. Go to Contact page
2. Fill in all form fields
3. Click "Send Message"
4. Page reloads instead of showing success message

**Playwright Test:**
```javascript
await page.fill('#name', 'Ash Ketchum');
await page.click('button[type="submit"]');
const message = await page.textContent('#contact-message');
expect(message).toContain('Thank you');
// FAILS because form handler not attached
```

---

## Visual Red Herrings (12 Total)

These are **intentionally bad design choices** that look like mistakes but don't break functionality.

### 🎨 Visual Bugs 1-4: Footer Alignment

**Location:** All pages (index.html, pokedex.html, calculator.html, contact.html)  
**CSS:** style.css, line 577

```css
.footer-text {
    text-align: right; /* Should be center */
}
```

**Why It's a Decoy:**
- Looks unprofessional
- But footer still displays correctly
- Doesn't break any functionality

---

### 🎨 Visual Bug 5: Clashing Fonts

**Location:** contact.html  
**CSS:** style.css, lines 466-481

```css
.font-clash-1 { font-family: 'Comic Sans MS', cursive; }
.font-clash-2 { font-family: 'Times New Roman', serif; }
.font-clash-3 { font-family: 'Courier New', monospace; }
```

**Why It's a Decoy:**
- Three completely different fonts on one page
- Looks terrible from a design perspective
- But text is still readable and nothing breaks

---

### 🎨 Visual Bug 6: Wrong Button Color

**Location:** contact.html  
**CSS:** style.css, line 366

```css
.submit-btn.warning-color {
    background: #ffc107 !important; /* Yellow instead of green */
}
```

**Why It's a Decoy:**
- Submit button is warning yellow instead of success green
- Poor UX design (wrong color association)
- But button still works perfectly

---

### 🎨 Visual Bug 7: Excessive Spacing

**Location:** contact.html  
**CSS:** style.css, line 563

```css
.info-grid.weird-spacing {
    gap: 4rem; /* Too much gap */
    padding: 0 5rem; /* Too much padding */
}
```

**Why It's a Decoy:**
- Contact info items spread too far apart
- Wastes space, looks awkward
- But information is still accessible

---

### 🎨 Visual Bug 3: Image Overlap

**Location:** calculator.html  
**CSS:** style.css, lines 443-453

```css
.chart-container.overlap-issue .chart-description {
    margin-top: -40px; /* Negative margin causes overlap */
}
```

**Why It's a Decoy:**
- Type chart image overlaps the description text
- Hard to read the overlapped text
- But doesn't prevent functionality (can still read most of it)

---

### 🎨 Visual Bug 9: Type Color Inconsistency

**Location:** style.css, lines 305-309

```css
.type-fire { background: #ff6347; } /* Slightly wrong shade */
.type-electric { background: #ffd700; color: #333; } /* Wrong shade */
```

**Why It's a Decoy:**
- Colors don't match official Pokemon type colors
- Looks "off" to Pokemon fans
- But badges still display and function correctly

---

### 🎨 Visual Bug 10: Inconsistent Button Styles

**Location:** style.css, line 583

```css
button:nth-child(odd) {
    border-radius: 5px; /* Square corners on some buttons */
}
```

**Why It's a Decoy:**
- Some buttons are rounded, some are square
- Inconsistent design system
- But all buttons still work

---

### 🎨 Visual Bug 11: Random Card Color

**Location:** style.css, line 588

```css
.pokemon-card:nth-child(3n) {
    background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
}
```

**Why It's a Decoy:**
- Every 3rd Pokemon card is yellow instead of gray
- Breaks visual consistency
- But cards still function and display correctly

---

### 🎨 Visual Bug 12: Janky Hover Effect

**Location:** style.css, line 593

```css
.feature-card:nth-child(2):hover {
    transform: rotate(2deg) translateY(-5px);
}
```

**Why It's a Decoy:**
- Second feature card tilts on hover (looks weird)
- Inconsistent with other cards
- But hover effect doesn't break anything

---

## Bug Distribution Summary

| Category | Functional Bugs | Visual Bugs |
|----------|----------------|-------------|
| Event Listeners (Wrong ID/Class) | 6 | 0 |
| Logic Errors | 1 | 0 |
| Navigation Errors | 1 | 0 |
| Layout/Design Issues | 0 | 5 |
| Color/Typography Issues | 0 | 4 |
| Spacing Issues | 0 | 2 |
| Animation Issues | 0 | 1 |
| **TOTAL** | **8** | **12** |

---

## Testing Strategy

### For Volunteers:
1. Run `npm test` to verify all 8 bugs are detected
2. All functional tests should FAIL on broken code
3. Visual issues won't be tested (they're decoys)

### For Participants:
1. Fix bugs one at a time
2. Run tests after each fix
3. When all 8 tests pass, challenge complete!
4. Visual bugs should be ignored

---

## Difficulty Level: Medium

**Why Medium?**
- Bugs are straightforward (typos in IDs/classes, missing type conversion)
- Well-documented test suite guides participants
- Clear error messages from Playwright
- But requires understanding of:
  - DOM selection
  - Event listeners
  - JavaScript data types
  - String vs number operations

**Not Too Easy:** Multiple bugs of similar types can be confusing
**Not Too Hard:** All bugs follow common patterns developers see regularly

---

## Volunteer Checklist

- [x] 8 functional bugs implemented
- [x] 12 visual red herrings added
- [x] All bugs documented
- [x] Playwright tests written and verified
- [x] README created
- [x] Package.json configured
- [x] Site tested in browser
- [x] All pages interconnected
- [x] Theme is consistent (Pokemon)
- [x] Difficulty is appropriate (Medium)

---

**Ready for Browser Blitz! 🚀**
