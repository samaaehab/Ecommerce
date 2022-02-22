import { AdminAcountComponent } from './components/admin-acount/admin-acount.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AfterLoginService } from './services/after-login.service';
import { ProductModule } from './components/product/product.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcountComponent } from './components/acount/acount.component';
// import { AddressComponent } from './components/address/address.component';
// import { Admin2Component } from './components/admin2/admin2.component';
// import { AdmincategoryComponent } from './components/admincategory/admincategory.component';
// import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
// import { AdminordersComponent } from './components/adminorders/adminorders.component';
// import { AdminproductsComponent } from './components/adminproducts/adminproducts.component';
// import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

import { FavouritesComponent } from './components/favourites/favourites.component';
// import { FooterComponent } from './components/footer/footer.component';

import { MainhomeComponent } from './components/mainhome/mainhome.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
// import { OrdersComponent } from './components/orders/orders.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { UserDetailsComponent } from './components/user-details/user-details.component';

// import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
      {path: 'home', component:MainhomeComponent},
     
      {path: 'acount', component: AcountComponent},
      {path: 'admin-acount', component:AdminAcountComponent},
      {path: 'cart/checkout/confirm', component: ConfirmComponent,canActivate:[AfterLoginService]},
      {path: 'cart/checkout', component: CheckoutComponent,canActivate:[AfterLoginService]},
      {path: 'cart', component: CartComponent},
      {path: '', component:MainhomeComponent},
      {path:'favourites',component:FavouritesComponent},
      {path:'reset-password',component:ResetPasswordComponent},
      {path: 'admin-singup', component:AdminSignupComponent},
      
      {
        path: 'user', 
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
      },


      {
        path: 'products', 
        loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
      },

      {
        path: 'contact', 
        loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
      },

      {
        path: 'admn', 
        loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
      },

       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 