import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(
      private authService:AuthService,
      private recipeService:RecipeService
  ) {}

  ngOnInit() {
  }

}
