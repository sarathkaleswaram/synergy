import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { PincodeController } from  'ionic2-pincode-input';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from "ngx-store";
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  form: FormGroup;

  constructor(private nav: NavController, 
              public pincodeCtrl: PincodeController,
              private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,
              private toastCtrl: ToastController) {
    this.form = this.formBuilder.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "email": ["", Validators.required],
      "phone": ["", Validators.required]
    });
  }

  signup() {
    let pinCode =  this.pincodeCtrl.create({
      title:'Synerge Pincode',
      passSize: 4,
      hideForgotPassword: true,
      hideCancelButton: true
    });
    pinCode.present();
    pinCode.onDidDismiss( (code,status) => {
      if(status === 'done'){
        this.localStorageService.set("Pincode", code);
        this.verifyPin();        
      }      
    });
  }

  verifyPin() {
    let pinCode =  this.pincodeCtrl.create({
      title:'Verify Pincode',
      passSize: 4,
      hideForgotPassword: true,
      hideCancelButton: true
    });
    pinCode.present();
    pinCode.onDidDismiss( (code,status) => {
      if(status === 'done'){
        if(this.localStorageService.get("Pincode") === code){
          this.localStorageService.set("FirstName", this.form.controls["firstName"].value);
          this.localStorageService.set("LastName", this.form.controls["lastName"].value);
          this.localStorageService.set("Email", this.form.controls["email"].value);
          this.localStorageService.set("Phone", this.form.controls["phone"].value);
          this.localStorageService.set("SIGNUP_COMPLETED", true);
          setTimeout(() => {
            this.nav.setRoot(TabsPage);            
          }, 1000);
          let toast = this.toastCtrl.create({
            message: 'Signup Successful.',
            duration: 3000,
            position: 'top'
          });        
          toast.present();
        } else {
          let toast = this.toastCtrl.create({
            message: 'Pincode does not Match.',
            duration: 3000,
            position: 'middle'
          });        
          toast.present();
        }
      }
    });
  }

}
