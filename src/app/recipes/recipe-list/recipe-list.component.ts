import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
    new Recipe('A test recipe', 'this is a test', 'https://www.publicdomainpictures.net/pictures/270000/nahled/pizza-1532881335pCX.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
