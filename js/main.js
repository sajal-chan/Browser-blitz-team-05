// ========================================
// POKEMON DATA
// ========================================

const pokemonData = [
    { id: 1, name: 'Bulbasaur', type: 'grass', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
    { id: 4, name: 'Charmander', type: 'fire', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' },
    { id: 7, name: 'Squirtle', type: 'water', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png' },
    { id: 25, name: 'Pikachu', type: 'electric', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
    { id: 39, name: 'Jigglypuff', type: 'psychic', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png' },
    { id: 94, name: 'Gengar', type: 'psychic', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
    { id: 133, name: 'Eevee', type: 'fire', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' },
    { id: 143, name: 'Snorlax', type: 'fire', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png' },
    { id: 150, name: 'Mewtwo', type: 'psychic', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png' },
    { id: 6, name: 'Charizard', type: 'fire', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    { id: 9, name: 'Blastoise', type: 'water', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
    { id: 3, name: 'Venusaur', type: 'grass', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
];

// ========================================
// INDEX PAGE FUNCTIONALITY
// ========================================

// BUG 1: Navigation button has wrong href/path
// This button should navigate to pages/pokedex.html
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // BUG: Wrong path - missing 'pages/' directory
            window.location.href = 'pokedex.html'; // Should be 'pages/pokedex.html'
        });
    }

    // BUG 2: Counter increment button - wrong class selector
    // The button has class "increment-btn" but we're selecting "increment-button"
    const incrementBtn = document.querySelector('.increment-button'); // Should be '.increment-btn'
    const counterValue = document.getElementById('counter-value');
    const resetBtn = document.getElementById('reset-btn');
    
    let count = 0;
    
    if (incrementBtn && counterValue) {
        incrementBtn.addEventListener('click', function() {
            count++;
            counterValue.textContent = count;
        });
    }
    
    if (resetBtn && counterValue) {
        resetBtn.addEventListener('click', function() {
            count = 0;
            counterValue.textContent = count;
        });
    }

    // BUG 3: Newsletter form - wrong ID selector
    // The form has id "newsletter-form" but we're selecting "subscribe-form"
    const newsletterForm = document.getElementById('subscribe-form'); // Should be 'newsletter-form'
    const formMessage = document.getElementById('form-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('email-input');
            if (emailInput && emailInput.value) {
                formMessage.textContent = 'Thank you for subscribing!';
                formMessage.style.color = '#28a745';
                emailInput.value = '';
            }
        });
    }
});

// ========================================
// POKEDEX PAGE FUNCTIONALITY
// ========================================

// Load Pokemon cards
function loadPokemon() {
    const container = document.getElementById('pokemon-container');
    if (!container) return;
    
    container.innerHTML = '';
    pokemonData.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        container.appendChild(card);
    });
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <img src="${pokemon.img}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <span class="pokemon-type type-${pokemon.type}">${pokemon.type}</span>
    `;
    return card;
}

// BUG 4: Case-sensitive search when it should be case-insensitive
// This will fail to find "pikachu" when the data is "Pikachu"
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value; // BUG: Not converting to lowercase
            searchResults.innerHTML = '';
            
            if (query.length > 0) {
                // BUG: Case-sensitive comparison - should use toLowerCase()
                const results = pokemonData.filter(p => p.name.includes(query));
                
                if (results.length > 0) {
                    results.forEach(pokemon => {
                        const resultItem = document.createElement('div');
                        resultItem.textContent = pokemon.name;
                        resultItem.style.padding = '0.5rem';
                        resultItem.style.cursor = 'pointer';
                        resultItem.style.borderBottom = '1px solid #ddd';
                        searchResults.appendChild(resultItem);
                    });
                } else {
                    searchResults.innerHTML = '<p>No Pokemon found</p>';
                }
            }
        });
    }
    
    // Load Pokemon grid on page load
    loadPokemon();
    
    // BUG 5: Type filter - wrong element ID
    // The select element has id "type-filter" but we're selecting "pokemon-filter"
    const typeFilter = document.getElementById('pokemon-filter'); // Should be 'type-filter'
    const pokemonContainer = document.getElementById('pokemon-container');
    
    if (typeFilter && pokemonContainer) {
        typeFilter.addEventListener('change', function() {
            const selectedType = typeFilter.value;
            pokemonContainer.innerHTML = '';
            
            const filtered = selectedType === 'all' 
                ? pokemonData 
                : pokemonData.filter(p => p.type === selectedType);
            
            filtered.forEach(pokemon => {
                const card = createPokemonCard(pokemon);
                pokemonContainer.appendChild(card);
            });
        });
    }
});

// ========================================
// CALCULATOR PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // BUG 6: String concatenation instead of numeric addition
    // This will result in "10 + 20 + 30 = 102030" instead of "60"
    const calculateDamageBtn = document.getElementById('calculate-damage');
    const totalDamageDisplay = document.getElementById('total-damage');
    
    if (calculateDamageBtn && totalDamageDisplay) {
        calculateDamageBtn.addEventListener('click', function() {
            const attack1 = document.getElementById('attack1').value;
            const attack2 = document.getElementById('attack2').value;
            const attack3 = document.getElementById('attack3').value;
            
            // BUG: Using string concatenation instead of numeric addition
            // Should use: Number(attack1) + Number(attack2) + Number(attack3)
            // Or: parseInt(attack1) + parseInt(attack2) + parseInt(attack3)
            const total = attack1 + attack2 + attack3;
            
            totalDamageDisplay.textContent = total;
        });
    }
    
    // BUG 7: Stats calculator - wrong button ID
    // The button has id "calculate-stats" but we're selecting "calc-stats"
    const calculateStatsBtn = document.getElementById('calc-stats'); // Should be 'calculate-stats'
    const battlePowerDisplay = document.getElementById('battle-power');
    
    if (calculateStatsBtn && battlePowerDisplay) {
        calculateStatsBtn.addEventListener('click', function() {
            const basePower = parseInt(document.getElementById('base-power').value);
            const level = parseInt(document.getElementById('level').value);
            const multiplier = parseFloat(document.getElementById('multiplier').value);
            
            const battlePower = Math.floor(basePower * (level / 10) * multiplier);
            battlePowerDisplay.textContent = battlePower;
        });
    }
});

// ========================================
// CONTACT PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // BUG 8: Contact form submit - wrong form ID
    // The form has id "contact-form" but we're selecting "contact-form-submit"
    const contactForm = document.getElementById('contact-form-submit'); // Should be 'contact-form'
    const contactMessage = document.getElementById('contact-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                contactMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
                contactMessage.style.color = '#28a745';
                contactForm.reset();
            }
        });
    }
    
    // FAQ Toggle functionality (this works correctly - no bug)
    const faqButtons = document.querySelectorAll('.toggle-faq');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const faqItem = button.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                button.textContent = 'Hide Answer';
            } else {
                answer.style.display = 'none';
                button.textContent = 'Show Answer';
            }
        });
    });
});

// ========================================
// UTILITY FUNCTIONS (These work correctly)
// ========================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
