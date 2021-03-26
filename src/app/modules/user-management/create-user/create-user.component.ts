import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  departmentList: any = [];
  roleList: any = [];
  APICONSTANT: any;
  saveOrUpdate: string = 'Create';
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrService: CommonToastrService,) { }

  ngOnInit(): void {
    this.initUserForm();
    this.getMasterData();
    this.initObservable();
    this.APICONSTANT = this.userService.getConfig();
  }
  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      lastName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      emailId: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      department: [null, Validators.compose([Validators.required])],
      role: [null],
      mobileNo: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    });
  }
  get u() {
    return this.userForm.controls;
  }
  saveOrUpdateUser() {
    let service;
    if (this.saveOrUpdate == 'Create') {
      service = 'createUser';
    } else {
      service = 'updateUser';
    }
    this.userService[service](this.userForm.value).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.hideForm();
        this.toastrService.showSuccess(res.message, this.APICONSTANT.TITLE);
        this.resetUser();
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      if (error.status == 500) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else if (error.status == 204) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else {
        this.toastrService.showError('Error While Creating User', this.APICONSTANT.TITLE);
      }
    });
  }
  resetUser() {
    this.saveOrUpdate='Create';
    this.userForm.reset();
  }
  getMasterData() {
    let options = ['USER_DEPT'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['userDepartment'] != null && masterData['userDepartment'].length > 0) {
          this.departmentList = masterData['userDepartment'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
  initObservable() {
    this.userService.userInfo.subscribe(data => {
      if (data!=null) {
        this.resetUser();
        this.userForm.patchValue(data);
        this.saveOrUpdate = 'Update';
        this.getDesignation(data.department);
      } else {
        this.resetUser();
      }
    })
  }
  getDesignation(department){
    let option = 'USER_DESIGNATION';
    let param = {
      optionType: option,
      level1Value:department
    }
    this.userService.getMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['userDesignation'] != null && masterData['userDesignation'].length > 0) {
          this.roleList = masterData['userDesignation'];
        }
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Designation', this.APICONSTANT.TITLE);
    });
  }
}
