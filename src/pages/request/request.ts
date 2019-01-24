import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  AlertController
} from "ionic-angular";
import { EmailComposer } from "@ionic-native/email-composer";
import { LocalStorageService } from "ngx-store";

@IonicPage()
@Component({
  selector: "page-request",
  templateUrl: "request.html"
})
export class RequestPage {
  meetingSpace: boolean = false;
  cafeteria: boolean = false;
  food_beverages: boolean = false;
  emailSentMessageShow: boolean = false;
  meetingSpaceDate;
  meetingSpaceTime;
  cafeteriaDate;
  cafeteriaTime;
  items;
  message: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private emailComposer: EmailComposer,
    public platform: Platform,
    private localStorageService: LocalStorageService,
    public alert: AlertController
  ) {}

  book() {
    this.message =
      "From: " +
      this.localStorageService.get("FirstName") +
      " " +
      this.localStorageService.get("LastName") +
      " <br></br>";
    this.message +=
      "Email: " +
      this.localStorageService.get("Email") +
      " <br></br> Phone: " +
      this.localStorageService.get("Phone") +
      " <br></br>";
    if (this.meetingSpace) {
      this.message += "<br></br> Meeting Space <br></br>";
      this.message +=
        "Date: " +
        this.meetingSpaceDate +
        "<br></br>Time: " +
        this.meetingSpaceTime +
        "<br></br>";
    }
    if (this.cafeteria) {
      this.message += "<br></br> Cafeteria <br></br>";
      this.message +=
        "Date: " +
        this.cafeteriaDate +
        "<br></br>Time: " +
        this.cafeteriaTime +
        "<br></br>";
    }
    if (this.food_beverages) {
      this.message += "<br></br> Food/Beverages <br></br>";
      this.message += "Items: " + this.items;
    }
    console.log("message---------", this.message);
    //  this.emailComposer.requestPermission().then(test => {
    //    console.log(test, '---------------test');
    //  });
    let email = {
      to: "synergeworkspace@gmail.com",
      subject: "Mail from Synerge App",
      body: this.message
    };
    // Send a text message using default options
    this.emailComposer
      .open(email)
      .then(result => {
        console.log("Mail sent successful", result);
        this.emailSentMessageShow = true;
      })
      .catch(error => {
        console.log("Mail sent error ", error);
      });

    // if (this.platform.is('cordova')) {
    //   this.emailComposer.hasPermission().then((isPermitted: boolean) => {
    //     if(isPermitted){
    //       let email = {
    //         to: 'helpdesk.synergyworkspace@gmail.com',
    //         subject: 'Mail from Synerge App',
    //         body: this.message
    //       };
    //       // Send a text message using default options
    //       this.emailComposer.open(email);
    //     }
    //   }).catch((error: any) => {
    //     let alert = this.alert.create({
    //       title: "You don't have Mail Access Permission.",
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //     console.log('No access permission granted');
    //     console.dir(error);
    //   });
    // }
  }
}
