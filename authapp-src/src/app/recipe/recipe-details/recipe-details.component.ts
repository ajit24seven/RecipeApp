import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipes:any;
  constructor(
      private authService:AuthService,
      private recipeService:RecipeService,
      private router:Router,
      private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    let recipe_id = this.activatedRoute.snapshot.params['id'];
      this.recipeService.getRecipe(recipe_id).subscribe(data => {
          this.recipes = data.recipe;
      },
      err => {
          console.log(err);
          return false;
      }
    )
  };
}
