import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FileUploader } from 'ng2-file-upload';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css'],
  
})
export class RecipeNewComponent implements OnInit {
  filePaths:String = "";
  filename:String = "";
  rForm:FormGroup;
  postRecipe:any = {};
  formObj:any = {};
  description:String;
  isEdit = false;
  imagePath = "";
  private formSumitAttempt: boolean;

  private formSubmitAttempt: boolean;

  public uploader:FileUploader = new FileUploader({
    url:'http://localhost:3000/upload/upload', 
    itemAlias: 'photo'
  });

  constructor(
      private recipeService:RecipeService,
      public toastr:ToastsManager,
      vcr:ViewContainerRef,
      private authService:AuthService,
      private fb:FormBuilder,
      private router:Router,
      private activatedRoute:ActivatedRoute
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let recipe_id = this.activatedRoute.snapshot.params['id'];
    this.rForm = this.fb.group({
      title: ['', Validators.required ],
      description: ['', Validators.required ],
      image_url: ['', Validators.required ],
      cuisines: ['', Validators.required ],
      category: ['', Validators.required ],
      subcategory: ['', Validators.required ],
      microcategory: ['', Validators.required ],
      prep_time: ['', Validators.required ],
      cook_time: ['', Validators.required ],
      extra_time: ['', Validators.required ],
      ready_time: ['', Validators.required ],
      servings: ['', Validators.required ],
      private: ['', Validators.required ],
      ingredients: this.fb.array([], Validators.required ),
      directions: this.fb.array([], Validators.required )
    })

    if(recipe_id){
      this.recipeService.getRecipe(recipe_id).subscribe(data => {
        this.isEdit = true;
        this.postRecipe = data.recipe;  
        this.rForm.patchValue(this.postRecipe);
        this.rForm.setControl('ingredients', this.fb.array(this.postRecipe.ingredients || [], Validators.required));
        this.rForm.setControl('directions', this.fb.array(this.postRecipe.directions || [], Validators.required));
        this.filePaths = this.rForm.get('image_url').value;
        },
        err => {
            console.log(err);
            return false;
        }
      ) 
    }

    this.uploader.onAfterAddingFile = (file)=> { 
      file.withCredentials = false; 
      this.filename = file.file.name
      if (this.uploader.queue.length > 1) {
          this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      
    };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        let getFileDetails = JSON.parse(response); 
        this.filePaths = getFileDetails.fileObj.path ? getFileDetails.fileObj.path : this.postRecipe.image_url;
        this.rForm.patchValue({
          image_url: this.filePaths
        });
    }; 
    
  }

  errMsg = {
      required:'This field is required!',
      title: {
        required: true,
        minlength: 3
      },
      description: {
        required: true,
        minlength: 200
      }
  }

  onSubmitNewRecipe(){
    var recipe = this.rForm.value
    if (this.rForm.valid) {
      this.recipeService.addRecipe(recipe).subscribe(data => {
        if(data.success){
          this.router.navigate(['/recipe']);
          this.toastr.success(data.msg, 'Success!');
        }
      });
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

  updateRecipe(){
    var recipe = this.rForm.value
    if (this.rForm.valid) {
      this.recipeService.updateRecipe(this.activatedRoute.snapshot.params['id'], recipe).subscribe(data => {
        if(data.success){
          this.router.navigate(['/recipe']);
          this.toastr.success(data.msg, 'Success!');
        }
      });
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {       
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);           
      if (control instanceof FormControl) {           
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {      
        this.validateAllFormFields(control);          
      }
    });
  }
  ingredients(value){
      const control = <FormArray>this.rForm.controls['ingredients'];
      control.push(new FormControl(value));
  }
  directions(value){
      const control = <FormArray>this.rForm.controls['directions'];
      control.push(new FormControl(value));
  }
  deleteRow(index: number, formname:string) {
        const control = <FormArray>this.rForm.controls[formname];
        control.removeAt(index);
  }
}
