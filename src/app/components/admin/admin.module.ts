import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdmincategoryComponent } from './admincategory/admincategory.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminordersComponent } from './adminorders/adminorders.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { Admin2Component } from './admin2/admin2.component';


const routes: Routes = [

  {path:'admin',
    children: [
  
    {path:'dashboard',component:AdmindashboardComponent},
    {path:'product',component:AdminproductsComponent},
    {path:'users',component:AdminusersComponent},
    {path:'category',component:AdmincategoryComponent},
    {path:'order',component:AdminordersComponent},
  ]
},
]
@NgModule({
  declarations: [
    Admin2Component,
    AdmindashboardComponent,
    AdminproductsComponent,
    AdminusersComponent,
    AdmincategoryComponent,
    AdminordersComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
