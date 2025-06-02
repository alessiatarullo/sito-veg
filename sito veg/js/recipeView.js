import { recipes } from './recipes.js';
import { initializeHeader } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
    history.replaceState({ view: 'list' }, '', '');
    filterRecipes('all');
  
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.getAttribute('data-filter');
            filterRecipes(category);
        });
    });

    const searchButton = document.querySelector('#search-button');
    const searchInput = document.querySelector('#search-input');

    // Funzione di ricerca
    const performSearch = () => {
        const raw = searchInput.value.trim();
        const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`\\b${escaped}\\b`, 'i');
        const container = document.querySelector('.main-recipes-container');
        container.innerHTML = '';
        
        const filteredRecipes = recipes.filter(recipe => {
            const text = [
                recipe.titolo,
                recipe.descrizione,
                recipe.ingredienti
            ]
            .filter(Boolean)
            .join(' ');
            return re.test(text);
        });
        
        if (filteredRecipes.length === 0) {
            container.innerHTML = `<p class="text-center my-5 fs-3">Nessuna ricetta trovata :(</p>`;
            return;
        }
        
        filteredRecipes.forEach(r => {
            container.appendChild(createRecipeDiv(r));
        });
    };

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
});

function filterRecipes(category) {
    const container = document.querySelector('.main-recipes-container');
    const headerTitle = document.querySelector('#header-title');
    headerTitle.style.display = 'block'; // Mostra l'header quando torni alla lista
    container.innerHTML = ''; // pulisce il contenitore

    const filteredRecipes = category === 'all' 
        ? recipes // se category è 'all', usa tutte le ricette
        : recipes.filter(recipe => recipe.portata === category); // altrimenti filtra per categoria

    // Mostra le ricette filtrate
    filteredRecipes.forEach(recipe => {
        const recipeDiv = createRecipeDiv(recipe);
        container.appendChild(recipeDiv);
    });
}


function showRecipe(recipeId) {
  window.scrollTo(0, 0); 
  const container = document.querySelector('.main-recipes-container');
  const headerTitle = document.querySelector('#header-title');
  container.innerHTML = '';
  const recipe = recipes.find(r => r.id === recipeId); //trova ricetta dove id corrisponde a id passato
  if (recipe) {
    history.pushState({ view: 'recipe', id: recipeId }, '', `#${recipeId}`);
    // crea un nuovo div per la ricetta
    headerTitle.style.display = 'none';

    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('recipe-details', 'container');
    
    const ingredientiArray = recipe.ingredienti.split(',');

    recipeDetails.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2 class="text-center mb-4">${recipe.titolo}</h2>
                <img src="${recipe.immagine}" class="img-fluid mb-4 rounded" alt="${recipe.titolo}">
                <p class="mb-3">${recipe.descrizione}</p>
                <p class="mb-3"><strong>categoria:</strong> ${recipe.portata}</p>
                <div class="mb-3">
                  <p class="mb-3"><strong>ingredienti:</strong></p>
                  <ul>
                      ${ingredientiArray.map(ingrediente => `<li>${ingrediente.trim()}</li>`).join('')}
                  </ul>
              </div>
              <div>
                  <p class="mb-3"><strong>procedimento:</strong></p>
                  <p>${recipe.procedimento}</p>
              </div>
          </div>
      </div>
`;

    container.appendChild(recipeDetails);
}
}

function createRecipeDiv(recipe) {
  const recipeDiv = document.createElement("div"); // crea un contenitore vuoto
  recipeDiv.classList.add("col-md-6", "mb-4"); //  aggiunge due classi Bootstrap all'elemento, col-md-6 = due per riga

  recipeDiv.innerHTML = `
    <div class="card w-75 mx-auto">
          <a href="#" class="text-decoration-none text-dark">
              <img src="${recipe.immagine}" class="card-img-top" alt="${recipe.titolo}">
              <div class="card-body">
                  <h3 class="card-title text-center">${recipe.titolo}</h3>
                  <p class="card-text text-center">${recipe.descrizione}</p>
              </div>
          </a>
      </div>
  `;

  const link = recipeDiv.querySelector('a');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showRecipe(recipe.id);
    });

  return recipeDiv; //Senza return la funzione non fornirebbe div creato e non utilizzabile fuori della funzione stessa.
}

window.addEventListener('popstate', (event) => {
  if (event.state === null || event.state.view === 'list') {
      filterRecipes('all');
  } else if (event.state.view === 'recipe') {
      showRecipe(event.state.id);
  }
});

export { filterRecipes, createRecipeDiv, showRecipe }; // per rendere disponibili ad altri file