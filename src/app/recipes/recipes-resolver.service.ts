import { map, switchMap, take } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import {of} from 'rxjs'


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService: DataStorageService, 
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>
        ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('recipes')
        .pipe(
            take(1),
            map(recipesState => {
            return recipesState.recipes;
        }),
        switchMap(recipes => {
            if(recipes.length === 0){
                return this.dataStorageService.fetchRecipes();
            }
            else {
                return of(recipes)
            }
        }))
    }
}