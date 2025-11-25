const MENU_FACTS = {
  doner: {
    nutrition: {
      calories: "640 kcal",
      protein: "32g",
      spice: "Smoky mild"
    },
    facts: [
      "Our döner is shaved straight off a vertical spit roasted all evening long.",
      "Pickles, sumac onions and garlic yogurt are made in-house every night.",
      "Served on Utrecht-baked pita delivered just before sunset."
    ],
    benefits: [
      "Protein-packed fuel for all-night coding sprints",
      "Balanced with crunchy salad and fresh herbs",
      "Garlic yogurt keeps things bright, never greasy"
    ],
    season: "Best when the city lights glow (so...always)."
  },
  chicken_wrap: {
    nutrition: {
      calories: "580 kcal",
      protein: "34g",
      spice: "Fiery harissa"
    },
    facts: [
      "Marinated in harissa, citrus and smoked paprika for 24 hours.",
      "Finished on the grill for crispy edges and juicy centers.",
      "Wrapped with charred peppers and pickled chilies."
    ],
    benefits: [
      "Slow-burn heat that keeps you warm on night shifts",
      "Lean protein + veggies for a lighter bite",
      "Pairs perfectly with our mint ayran"
    ],
    season: "Ideal for late-night tram rides home."
  },
  falafel: {
    nutrition: {
      calories: "520 kcal",
      protein: "22g",
      crunch: "Sesame crust"
    },
    facts: [
      "We soak chickpeas overnight and grind them with fresh herbs.",
      "Fried to order in small batches so every bite stays crunchy.",
      "Served with tahini drizzle, pickled cabbage and pomegranate molasses."
    ],
    benefits: [
      "Plant-powered comfort food",
      "Naturally vegan without sacrificing indulgence",
      "Loaded with herbs, fiber and citrus"
    ],
    season: "Peak enjoyment during Utrecht's canal-side sunsets."
  },
  loaded_fries: {
    nutrition: {
      calories: "700 kcal",
      carbs: "78g",
      spice: "Garlic-chili dust"
    },
    facts: [
      "Triple-cooked fries topped with slow-braised meats or falafel crumbs.",
      "Finished with roasted garlic toum and chili oil.",
      "Inspired by the legendary street carts next to Jaarbeurs."
    ],
    benefits: [
      "Shareable comfort for the whole squad",
      "Perfect sidekick for every kebab on the menu",
      "Serious crunch thanks to hand-cut potatoes"
    ],
    season: "Serve whenever your playlist hits the drop."
  }
};

const NUTRITION_LABELS = {
  calories: "Calories",
  protein: "Protein",
  spice: "Spice Level",
  crunch: "Crunch Factor",
  carbs: "Carbs"
};

function getMenuFacts(item) {
  return MENU_FACTS[item] || null;
}

function createFactsSection(item) {
  const facts = getMenuFacts(item);
  if (!facts) return '';

  const nutritionItems = Object.entries(facts.nutrition).map(([key, value]) => `
    <div class="nutrition-item">
      <span class="nutrition-value">${value}</span>
      <span class="nutrition-label">${NUTRITION_LABELS[key] || key}</span>
    </div>
  `).join('');

  return `
    <div class="facts-section">
      <div class="facts-nutrition">
        <h3>Kebab Stats</h3>
        <div class="nutrition-grid">
          ${nutritionItems}
        </div>
      </div>

      <div class="facts-benefits">
        <h3>Why You'll Love It</h3>
        <ul class="benefits-list">
          ${facts.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
      </div>

      <div class="fun-facts">
        <h3>Street Stories</h3>
        <div class="facts-carousel">
          ${facts.facts.map(fact => `
            <div class="fact-card">
              <p>${fact}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="season-info">
        <h3>Best Moment</h3>
        <p>${facts.season}</p>
      </div>
    </div>
  `;
}

// Initialize facts carousel
function initFactsCarousel() {
  const cards = document.querySelectorAll('.fact-card');
  let currentCard = 0;

  function showCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
  }

  function nextCard() {
    currentCard = (currentCard + 1) % cards.length;
    showCard(currentCard);
  }

  // Show first card and start rotation
  if (cards.length > 0) {
    showCard(0);
    setInterval(nextCard, 5000); // Rotate every 5 seconds
  }
}