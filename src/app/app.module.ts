// import { ProductModule } from './components/product/product.module';
import { AdminModule } from './components/admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';



import { AcountComponent } from './components/acount/acount.component';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

import { HttpClientModule } from '@angular/common/http';
// import { Admin2Component } from './components/admin2/admin2.component';
// import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
// import { AdminproductsComponent } from './components/adminproducts/adminproducts.component';
// import { AdminusersComponent } from './components/adminusers/adminusers.component';
// import { AdmincategoryComponent } from './components/admin/admincategory/admincategory.component';
// import { AdminordersComponent } from './components/adminorders/adminorders.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // // rebeat
    // AdmincategoryComponent,
   
    AcountComponent,
    MainhomeComponent,
    CheckoutComponent,
    CartComponent,
    FavouritesComponent,
    ConfirmComponent,
  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    FormsModule,
    

  ],
  // exports: [CommonModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }