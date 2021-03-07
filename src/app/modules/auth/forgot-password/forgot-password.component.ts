import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private formGroup: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.formGroup.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
    });
  }

  resetPassword() {
    let param={
      emailId:this.f.email.value
    }
    this.authService.forgotPassword(param)
    .subscribe((result: any) => {
      if (result.status==200) {
        this.router.navigate(['auth/login']);
      } else {
      }
    },(error:any)=>{
      this.router.navigate(['auth/login']);
      if(error.status==500){

      }else if(error.status==204){
        
      }
    });
  }
  redirectTo(){
    this.router.navigate(['auth/login']);
  }
}
