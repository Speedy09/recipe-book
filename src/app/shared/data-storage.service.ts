import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

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
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }))
        .subscribe(recipes => {
            this.recipesService.setRecipes(recipes)
        })
    }
}