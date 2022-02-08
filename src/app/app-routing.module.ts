import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AcountComponent } from './acount/acount.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactsUsComponent } from './contacts-us/contacts-us.component';
// import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { KidsComponent } from './kids/kids.component';
import { MainhomeComponent } from './mainhome/mainhome.component';
import { WomenComponent } from './women/women.component';
// import { HeaderComponent } from './header/header.component';

const routes: Routes = [
      {path: 'home', component:MainhomeComponent},
      {path: 'man', component: HomeComponent},
      {path: 'woman', component: WomenComponent},
      {path: 'kids', component: KidsComponent},
      {path: 'aboutus', component: AboutComponent},
      {path: 'contactus', component: ContactsUsComponent},
      {path: 'acount', component: AcountComponent},
      {path: 'cart/checkout', component: CheckoutComponent},
      {path: 'cart', component: CartComponent},
      {path: '', component:MainhomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 