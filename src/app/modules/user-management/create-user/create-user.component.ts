import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  designationList: any = [];
  departmentList: any = [];
  roleList: any = [];
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.initUserForm();
  }
  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      emailId: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      designation: [null, Validators.compose([Validators.required])],
      department: [null, Validators.compose([Validators.required])],
      role: [null],
      mobileNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
    });
  }
  get u() {
    return this.userForm.controls;
  }
  createUser() {
    this.authService.createUser(this.userForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        this.resetUser();
      } else {
      }
    }, (error: any) => {
      this.router.navigate(['user/dashboard']);
      if (error.status == 500) {

      } else if (error.status == 204) {

      }
    });
  }
  resetUser() {
    this.userForm.reset();
  }
}
