import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Injectable} from '@angular/core'
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Pizza', 
            'A super-tasty Pizza - just awesome!', 
            'https://www.monsieur-cuisine.com/fileadmin/_processed_/5/0/csm_23148_Rezeptfoto_01_21d2e4280f.jpg',
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

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index:number) {
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}