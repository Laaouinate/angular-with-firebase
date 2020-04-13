import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





const routes: Routes = [
  {path:"", redirectTo:'/clients', pathMatch:'full', canActivate:[AuthGuard]},
  {path: "clients", component: ListClientComponent , canActivate:[AuthGuard]},
  {path: "clients/create", component: AddClientComponent , canActivate:[AuthGuard]},
  {path: "clients/:id/edit", component: EditClientComponent , canActivate:[AuthGuard]},
  {path: "register", component: RegisterComponent },
  {path: "login", component: LoginComponent },
  {path: "**", component: ListClientComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
