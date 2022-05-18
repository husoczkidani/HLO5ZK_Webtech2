import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { CreateComponent } from "./collection/create/create.component";
import { ListComponent } from "./collection/list/list.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateComponent},
    { path: 'list', component: ListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}

export const routingComponents = [
    HomeComponent, 
    RegisterComponent, 
    LoginComponent, 
    CreateComponent,
    ListComponent
]