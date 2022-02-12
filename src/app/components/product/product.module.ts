import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { KidsComponent } from './kids/kids.component';
import { WomenComponent } from './women/women.component';

const routes: Routes = [
  {path: 'man', component: HomeComponent},
  {path: 'woman', component: WomenComponent},
  {path: 'kids', component: KidsComponent},
]

@NgModule({
  declarations: [
    HomeComponent,
    WomenComponent,
    KidsComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
  // ,
  // exports: [RouterModule] 
})
export class ProductModule { }
