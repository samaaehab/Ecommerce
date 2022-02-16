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

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FacebookLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialLoginModule} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  // exports: [CommonModule, NgxPaginationModule],

  providers: [
 
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider:new FacebookLoginProvider("1617656521913206")
          }
          , {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
             '490654533147-03t3mpss76npl32scc1qb2fsss2qn3q8.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
        console.log(err);
          
        },
      } as SocialAuthServiceConfig,
    }, SocialAuthService
    ,AppComponent
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}