import { Recipe } from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
        new Recipe('Another test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}