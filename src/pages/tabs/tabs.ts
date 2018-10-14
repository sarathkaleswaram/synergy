import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { WeOfferPage } from '../we-offer/we-offer';
import { RequestPage } from '../request/request';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RequestPage;
  // tab2Root = AboutPage;
  tab3Root = WeOfferPage;
  // tab4Root = ContactPage;

  constructor() {

  }
}
