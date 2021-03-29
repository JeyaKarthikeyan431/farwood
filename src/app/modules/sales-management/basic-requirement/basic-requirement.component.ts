import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-basic-requirement',
  templateUrl: './basic-requirement.component.html',
  styleUrls: ['./basic-requirement.component.scss']
})
export class BasicRequirementComponent implements OnInit {
  basicReqForm: FormGroup;

  leadId:any=null;
  APICONSTANT: any;
  maskConfig = {
    mask: [
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
    ],
    showMask: false,
    guide: false,
    placeholderChar: '_',
    keepCharPositions: true,
  };

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private toastrService: CommonToastrService,private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initBasicForm();
    this.getBasicInfo();
  }

  initBasicForm() {
    this.basicReqForm = this.formBuilder.group({
      areaOfProperty: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      noOfBedrooms: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      noOfKitchen: [null, Validators.compose([Validators.required,  Validators.minLength(1), Validators.maxLength(320)])],
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
      leadId : this.leadId,
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
  getBasicInfo() {
    let leadId = this.authService.decrypt(sessionStorage.getItem('leadId'));
    if (leadId != null && leadId != '') {
      this.leadId=leadId;
      this.getLeadInfoById(leadId);
    }else{
      this.leadId=null;
    }
  }
  getLeadInfoById(leadId) {
    this.userService.getLeadById(leadId).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        this.basicReqForm.patchValue(res.data['basicReqInfo']);
      } else {
        this.toastrService.showError('No Lead Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }
}
