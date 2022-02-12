import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactsUsComponent } from './contacts-us/contacts-us.component';


const routes: Routes = [
  {path: 'aboutus', component: AboutComponent},
  {path: 'contactus', component: ContactsUsComponent},
]
@NgModule({
  declarations: [
    AboutComponent,
    ContactsUsComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ContactModule { }
