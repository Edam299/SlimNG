import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ProduitListeComponent } from './produit-liste/produit-liste.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [

  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
  
  {
    path:'produits',
    pathMatch:'full',
    component: ProduitListeComponent
  }
  ,
  {
    path:'fournisseur',
    pathMatch:'full',
    component: FournisseurListComponent
  },
  {
    path:'commandes',
    pathMatch:'full',
    component: CommandeListComponent
  },
  {
    path:'login',
    pathMatch:'full',
    component: LoginComponent
  },
  {
    path:'register',
    pathMatch:'full',
    component: RegisterComponent
  },
  {
    path:'**',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
