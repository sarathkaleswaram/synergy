import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  meetingSpace: boolean = false;
  cafeteria: boolean = false;
  food_beverages: boolean = false;
  meetingSpaceDate;
  meetingSpaceTime;
  cafeteriaDate;
  cafeteriaTime;
  items;
  message: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private emailComposer: EmailComposer,
    public platform: Platform,
    public alert: AlertController) {
  }

  book() {
    this.message = "";
    if (this.meetingSpace) {
      this.message += "<br></br> Meeting Space <br></br>";
      this.message += "Date: " + this.meetingSpaceDate + "<br></br>Time: " + this.meetingSpaceTime + "<br></br>";
    }
    if (this.cafeteria) {
      this.message += "<br></br> Cafeteria <br></br>";
      this.message += "Date: " + this.cafeteriaDate + "<br></br>Time: " + this.cafeteriaTime + "<br></br>";
    }
    if (this.food_beverages) {
      this.message += "<br></br> Food/Beverages <br></br>";
      this.message += "Items: " + this.items;
    }
    console.log('message---------', this.message);

    if (this.platform.is('cordova')) {
      this.emailComposer.hasPermission().then((isPermitted: boolean) => {
        if(isPermitted){
          let email = {
            to: 'nanirazor@gmail.com',
            subject: 'Mail from Synergy App',
            body: this.message
          };
          // Send a text message using default options
          this.emailComposer.open(email);
        }
      }).catch((error: any) => {
        let alert = this.alert.create({
          title: "You don't have Mail Access Permission.",
          buttons: ['OK']
        });
        alert.present();
        console.log('No access permission granted');
        console.dir(error);
      });
    }
  }

}
