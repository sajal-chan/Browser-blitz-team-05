# ⚡ Quick Start Guide - Browser Blitz Team 05

## 🚀 Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
npm run install-browsers
```

### Step 2: Start the Server
```bash
npm run serve
```
Site runs at: `http://localhost:8080`

### Step 3: Run Tests
```bash
npm test
```

---

## 📊 Expected Test Results

### BEFORE Fixing Bugs (All Should FAIL):
```
❌ BUG 1: Navigation button path error
❌ BUG 2: Counter increment selector error
❌ BUG 3: Newsletter form ID error
❌ BUG 4: Search case sensitivity error
❌ BUG 5: Type filter ID error
❌ BUG 6: String concatenation error
❌ BUG 7: Stats calculator button ID error
❌ BUG 8: Contact form ID error

Tests: 8 failed, 0 passed, 8 total
```

### AFTER Fixing Bugs (All Should PASS):
```
✅ BUG 1: Navigation button path error
✅ BUG 2: Counter increment selector error
✅ BUG 3: Newsletter form ID error
✅ BUG 4: Search case sensitivity error
✅ BUG 5: Type filter ID error
✅ BUG 6: String concatenation error
✅ BUG 7: Stats calculator button ID error
✅ BUG 8: Contact form ID error

Tests: 8 passed, 0 failed, 8 total
```

---

## 🎯 The 8 Bugs (Quick Reference)

1. **Navigation** - Wrong path to pokedex.html
2. **Counter** - Wrong button class selector
3. **Newsletter** - Wrong form ID
4. **Search** - Missing toLowerCase() for case-insensitive search
5. **Filter** - Wrong select element ID
6. **Calculator** - String concatenation instead of number addition
7. **Stats** - Wrong button ID
8. **Contact** - Wrong form ID

---

## 📁 Files to Edit

**ALL BUGS ARE IN:** `js/main.js`

**DO NOT EDIT:**
- HTML files (structure is correct)
- CSS files (visual bugs are intentional decoys)
- Test files (they verify your fixes)

---

## 🎨 Ignore These Visual "Bugs"

- Footer alignment
- Clashing fonts on contact page
- Yellow submit button
- Image overlapping text
- Weird spacing
- Inconsistent colors
- Random card styles

These are **red herrings** - they look bad but don't break functionality!

---

## 🔍 Debugging Tips

1. **Open Browser DevTools** - Check console for errors
2. **Test Each Feature** - Click buttons, submit forms, try searches
3. **Read Test Output** - Playwright tells you exactly what fails
4. **One Bug at a Time** - Fix, test, repeat
5. **Check Line Numbers** - Comments in code show bug locations

---

## 📚 Documentation

- `README.md` - Full documentation
- `BUG_DOCUMENTATION.md` - Detailed bug explanations
- `.hidden-tests/bugs.spec.js` - Test specifications

---

## 🏆 Success Criteria

✅ All 8 Playwright tests pass  
✅ All interactive features work  
✅ No console errors  
✅ Site navigates correctly  

---

## ❓ Need Help?

1. Check `BUG_DOCUMENTATION.md` for detailed explanations
2. Read Playwright test error messages carefully
3. Use browser DevTools to inspect elements and console
4. Compare HTML IDs/classes with JavaScript selectors

---

**Good luck! You've got this! 💪**
