import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { getAuthStatus } from '../../reducers/selectors';
import { Subscription } from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  formSubmit = false;
  title = environment.AppName;
  registerSubs: Subscription;

  tranz: any = {
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm();
    this.translate.get('signUp').subscribe((res: any) => {
      this.tranz = res;
    });
  }

  onSubmit() {
    
    const values = this.signUpForm.value;
    const keys = Object.keys(values);
    this.formSubmit = true;

    if (this.signUpForm.valid) {
      this.registerSubs = this.authService.register(values).subscribe(data => {

        if(data.error) this.pushErrorFor("email", data.msg);

      });
    } else {
      keys.forEach(val => {
        const ctrl = this.signUpForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        };
      });
    }
  }
  
  private pushErrorFor(ctrl_name: string, msg: string) {
    this.signUpForm.controls[ctrl_name].setErrors({'msg': msg});
  }

  initForm() {

    const email = '';
    const password = '';
    const password_confirmation = '';
    const mobile = '';
    const gender = '';

    this.signUpForm = this.fb.group({  
      'email': [email, Validators.compose([Validators.required, Validators.email]) ],
        'password': [password, Validators.compose([Validators.required, Validators.minLength(6)]) ],
        'password_confirmation': [password_confirmation, Validators.compose([Validators.required, Validators.minLength(6)]) ],
        'mobile': [mobile, Validators.compose([Validators.required,Validators.pattern('[0-9]{8,}')]) ],
        'gender': [gender, Validators.required]
      },{validator: this.matchingPasswords('password', 'password_confirmation')}
    );

  }

  redirectIfUserLoggedIn() {
    this.store.select(getAuthStatus).subscribe(
      data => {
        if (data === true) { 
        this.router.navigateByUrl('/'); 
      }}
    );
  }

  ngOnDestroy() {
    if (this.registerSubs) { this.registerSubs.unsubscribe(); }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true		
      };
    }
  }
}
}
