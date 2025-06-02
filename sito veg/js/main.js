// importa le funzioni di inizializzazione
import { initializeHeader } from './header.js';
import { initRecipes }       from './recipes.js';
import { initRecipeView }    from './recipeView.js';

// aspetta che il DOM sia pronto
window.addEventListener('DOMContentLoaded', () => {
  // 1) metto sempre l’header
  initializeHeader();

  // 2) se trovo il container delle ricette, avvio initRecipes
  if (document.querySelector('.main-recipes-container')) {
    initRecipes();
  }

  // 3) se trovo un dettaglio di ricetta (es. id="recipe-detail"), avvio initRecipeView
  if (document.querySelector('#recipe-detail')) {
    initRecipeView();
  }
});