import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [

  {path:'profile',component:ProfileComponent},
  {path:'profile/userDetailes',component:UserDetailsComponent},
  {path:'profile/dashboard',component:ProfileComponent},
  {path:'profile/order',component:OrdersComponent},
  {path:'profile/address',component:AddressComponent},
]
@NgModule({
  declarations: [
    ProfileComponent,
    UserDetailsComponent,
    OrdersComponent,
    AddressComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class UserModule { }
