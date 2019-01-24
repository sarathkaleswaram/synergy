import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EmailComposer } from '@ionic-native/email-composer';
import { LocalStorageService } from "ngx-store";
import { PincodeInputModule } from  'ionic2-pincode-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeOfferPage } from '../pages/we-offer/we-offer';
import { RequestPage } from '../pages/request/request';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WeOfferPage,
    LoginPage,
    SignupPage,
    RequestPage
  ],
  imports: [
    BrowserModule,
    PincodeInputModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WeOfferPage,
    LoginPage,
    SignupPage,
    RequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    LocalStorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
