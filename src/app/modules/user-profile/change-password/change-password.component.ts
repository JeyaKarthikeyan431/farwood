import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ConfirmPasswordValidator } from '../../auth';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) {
  }

  ngOnInit(): void {
    this.loadForm();
  }
  get c() {
    return this.changePasswordForm.controls;
  }
  loadForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      newPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      confirmNewPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  changePassword() {
    let Param = {
      oldPassword: this.authService.encrypt(this.c.currentPassword.value),
      newPassword: this.authService.encrypt(this.c.newPassword.value)
    }
    this.authService.changePassword(Param).subscribe((res: any) => {
      if (res.status == 200) {
        this.router.navigate(['auth/login']);
      } else {
      }
    }, (error: any) => {
      if (error.status == 500) {

      } else if (error.status == 204) {

      }
    });
  }

  cancel() {
    this.changePasswordForm.reset();
  }
}
