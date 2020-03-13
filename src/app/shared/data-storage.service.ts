import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        return this.http.put('https://recipe-book-a69fe.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response)
        });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://recipe-book-a69fe.firebaseio.com/recipes.json')
        .subscribe(recipes => {
            this.recipesService.setRecipes(recipes)
        })
    }
}