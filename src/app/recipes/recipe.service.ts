import { Recipe } from './recipe.model';
import {EventEmitter} from '@angular/core'

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
        new Recipe('Another test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}