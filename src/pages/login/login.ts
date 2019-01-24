import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { LocalStorageService } from 'ngx-store';
import { PincodeController } from 'ionic2-pincode-input';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  name: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private localStorageService: LocalStorageService,
    public pincodeCtrl: PincodeController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    this.name = this.localStorageService.get("FirstName");
  }

  login() {
    let pinCode = this.pincodeCtrl.create({
      title: 'Synerge Pincode',
      passSize: 4,
      hideCancelButton: true
    });
    pinCode.present();
    pinCode.onDidDismiss((code, status) => {
      if (status === 'done') {
        if (this.localStorageService.get("Pincode") === code) {
          setTimeout(() => {
            this.navCtrl.setRoot(TabsPage);
          }, 1000);
          let toast = this.toastCtrl.create({
            message: 'Login Successful.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        } else {
          let toast = this.toastCtrl.create({
            message: 'You entered an invalid PIN. Please retry!',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        }
      } else if (status === 'forgot') {
        let alert = this.alertCtrl.create({
          title: 'Login',
          message: 'Please enter your email address to reveal your Pincode.',
          inputs: [
            {
              name: 'email',
              placeholder: 'Email'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Submit',
              handler: data => {
                console.log(this.localStorageService.get("Email").toLocaleLowerCase());
                console.log(data.email.toLocaleLowerCase())
                if (this.localStorageService.get("Email").toLocaleLowerCase() === data.email.toLocaleLowerCase()) {
                  let pinAlert = this.alertCtrl.create({
                    subTitle: 'Your Synerge Pincode is: ' + this.localStorageService.get("Pincode"),
                    buttons: ['Ok']
                  });
                  pinAlert.present();
                } else {
                  let pinAlert = this.alertCtrl.create({
                    title: 'You entered an invalid Email.',
                    buttons: ['Ok']
                  });
                  pinAlert.present();
                }
              }
            }
          ]
        });
        alert.onDidDismiss(() => {
        });
        alert.present();
      }
    });
  }

}
