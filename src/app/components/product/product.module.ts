import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { KidsComponent } from './kids/kids.component';
import { WomenComponent } from './women/women.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { SubcategoryComponent } from './subcategory/subcategory.component';

const routes: Routes = [
  {path: 'men', component: HomeComponent},
  {path: 'woman', component: WomenComponent},
  { path: 'kids', component: KidsComponent },
  { path: 'subcat', component: SubcategoryComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    WomenComponent,
    KidsComponent,
    SubcategoryComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
  // ,
  // exports: [RouterModule] 
})
export class ProductModule { }
