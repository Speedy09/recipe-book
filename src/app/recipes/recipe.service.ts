import { Recipe } from './recipe.model';
import {EventEmitter} from '@angular/core'
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Pizza', 
            'A super-tasty Pizza - just awesome!', 
            'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg',
            [
                new Ingredient('Cheese', 10),
                new Ingredient('Tomato', 1)
            ]),
        new Recipe(
            'Big Fat Burger', 
            "You've never eaten a better burger", 
            'https://d1doqjmisr497k.cloudfront.net/-/media/kamispl-2016/franks-pl/recipes_img/2000x1125/big_0003_pikantny_teksanski_burger.png?vd=20190329T115046Z&ir=1&width=885&height=498&crop=auto&quality=75&speed=0&hash=0F58CC5398890A3F5F025E28274253E286F5D3AC',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Meat', 1)
            ]),
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}