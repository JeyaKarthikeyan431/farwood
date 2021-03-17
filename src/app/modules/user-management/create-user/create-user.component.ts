import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth/_services/auth.service';
import { UserService } from '../../auth/_services/user.service';

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
    private router: Router,
    private userService: UserService,
    private toastrService : CommonToastrService,) { }

  ngOnInit(): void {
    this.initUserForm();
    this.getMasterData();
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
        this.router.navigate(['user/dashboard']);
      } else {
      }
    }, (error: any) => {
      if (error.status == 500) {

      } else if (error.status == 204) {

      }
    });
  }
  resetUser() {
    this.userForm.reset();
  }
  getMasterData() {
    let options = ['USER_DESIGNATION','USER_DEPT'];
    let param={
      multipleOptionType:options
    }
    this.userService.getMasterData(options).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['USER_DESIGNATION'] != null && masterData['USER_DESIGNATION'].length > 0
          && masterData['USER_DEPT'] != null && masterData['USER_DEPT'].length > 0) {
          this.designationList = masterData['USER_DESIGNATION'];
          this.departmentList = masterData['USER_DEPT'];
          this.roleList=masterData['USER_DEPT'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data','Error');
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data','Error');
    });
  }
}
