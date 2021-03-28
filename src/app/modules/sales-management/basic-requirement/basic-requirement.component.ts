import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-basic-requirement',
  templateUrl: './basic-requirement.component.html',
  styleUrls: ['./basic-requirement.component.scss']
})
export class BasicRequirementComponent implements OnInit {
  basicReqForm: FormGroup;

  APICONSTANT: any;

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private toastrService: CommonToastrService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initBasicForm();
  }

  initBasicForm() {
    this.basicReqForm = this.formBuilder.group({
      areaOfProperty: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      noOfBedrooms: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      noOfKitchen: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      noOfLivingRoom: [null, Validators.compose([Validators.required])],
      noCommonArea: [null, Validators.compose([Validators.required])],
      completionDate: [null],
    });
  }
  get b() {
    return this.basicReqForm.controls;
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }
  savePersonal(form){
    let param = {
      status : "QLP",
      basicReqInfo: this.basicReqForm.value
    }
    this.userService.createOrUpdateLead(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.salesFormNavigate(form);
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      if (error.status == 500) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else if (error.status == 204) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else {
        this.toastrService.showError('Error While Creating Lead', this.APICONSTANT.TITLE);
      }
    });
  }
}
