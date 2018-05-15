import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './gaurd/auth-guard.service';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { RecipeNewComponent } from './recipe/recipe-new/recipe-new.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeItemsComponent } from './recipe/recipe-items/recipe-items.component';

const appRoutes:Routes = [
    { path : "", redirectTo:"/home", pathMatch:"full"},
    { path : "home", component: HomeComponent},
    { path : "recipe", component: RecipeComponent, children:[
        {path:"", component:RecipeItemsComponent},
        {path:"new", component:RecipeNewComponent},
        {path:":id", component:RecipeDetailsComponent},
        {path:":id/edit", component:RecipeNewComponent}
    ]},
    { path : "register", component: RegisterComponent},
    { path : "login", component: LoginComponent},
    { path : "dashboard", component: DashboardComponent, canActivate:[AuthGuardService]},
    { path : "profile", component:ProfileComponent, canActivate:[AuthGuardService]}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule],
    providers: [AuthGuardService],
})

export class AppRoutingModule{

}