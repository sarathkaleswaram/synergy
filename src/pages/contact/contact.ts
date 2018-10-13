import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public form: FormGroup;

  constructor(public navCtrl: NavController,
    private emailComposer: EmailComposer,
    public platform: Platform,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      "name": ["", Validators.required],
      "email": ["", Validators.required],
      "subject": ["", Validators.required],
      "phone": ["", Validators.required],
      "address": ["", Validators.required],
      "message": ["", Validators.required]
    });
  }

  sendMessage() {
    if (this.platform.is('cordova')) {
      this.emailComposer.isAvailable().then((available: boolean) => {
        if (available) {
          console.log('coming------------available');
        }
        this.emailComposer.hasPermission().then((isPermitted: boolean) => {
          console.log(isPermitted, '--------------------isPermitted');
        })
          .catch((error: any) => {
            console.log('No access permission granted');
            console.dir(error);
          });
      })
        .catch((error: any) => {
          console.log('User does not appear to have device e-mail account');
          console.dir(error);
        });

      let body = 'Name: ' + this.form.controls["name"].value + '\nEmail: ' + this.form.controls["email"].value + '\nPhone: ' + this.form.controls["phone"].value + '\nAddress: ' + this.form.controls["address"].value + '\nMessage: ' + this.form.controls["message"].value;

      let email = {
        to: 'nanirazor@gmail.com',
        subject: this.form.controls["subject"].value,
        body: body
      };
      // Send a text message using default options
      this.emailComposer.open(email);
    }
  }

}
