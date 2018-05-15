import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.css']
})
export class RecipeItemsComponent implements OnInit {

  recipes:any;

  constructor(
      private authService:AuthService,
      private recipeService:RecipeService,
      private router:Router
  ) {}

  ngOnInit() {
      this.recipeService.getRecipes().subscribe(data => {
          this.recipes = data.recipe;
      },
      err => {
          console.log(err);
          return false;
      }
    )
  };

  deleteRecipeItem(id){
    this.recipeService.deleteRecipe(id).subscribe(data => {
    this.recipes.forEach(function(element, index, array){
        if(array[index]._id==id){
              array.splice(index,1);
        }
      });
      this.router.navigate(['/recipe']);
    },
      err => {
          console.log(err);
          return false;
      });  
    }
  }
