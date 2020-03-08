import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
    new Recipe('Another test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe)
  }

}
