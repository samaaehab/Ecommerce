import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AcountComponent } from './acount/acount.component';
import { AddressComponent } from './address/address.component';
import { Admin2Component } from './admin2/admin2.component';
import { AdmincategoryComponent } from './admincategory/admincategory.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminordersComponent } from './adminorders/adminorders.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ContactsUsComponent } from './contacts-us/contacts-us.component';
import { FavouritesComponent } from './favourites/favourites.component';
// import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { KidsComponent } from './kids/kids.component';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WomenComponent } from './women/women.component';
// import { HeaderComponent } from './header/header.component';

const routes: Routes = [
      {path: 'home', component:MainhomeComponent},
      {path: 'man', component: HomeComponent},
      {path: 'woman', component: WomenComponent},
      {path: 'kids', component: KidsComponent},
      {path: 'aboutus', component: AboutComponent},
      {path: 'contactus', component: ContactsUsComponent},
      {path:'acount/profile',component:ProfileComponent},
      {path: 'acount', component: AcountComponent},
      {path: 'cart/checkout/confirm', component: ConfirmComponent},
      {path: 'cart/checkout', component: CheckoutComponent},
      {path: 'cart', component: CartComponent},
      {path: '', component:MainhomeComponent},
      {path:'favourites',component:FavouritesComponent},
      {path:'profile/userDetailes',component:UserDetailsComponent},
      {path:'profile/dashboard',component:ProfileComponent},
      {path:'profile/order',component:OrdersComponent},
      {path:'profile/address',component:AddressComponent},
      
      {path:'admin',
      children:[
        {path:'dashboard',component:AdmindashboardComponent},
        {path:'product',component:AdminproductsComponent},
        {path:'users',component:AdminusersComponent},
        {path:'category',component:AdmincategoryComponent},
        {path:'order',component:AdminordersComponent},


      ]
    },

      





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 