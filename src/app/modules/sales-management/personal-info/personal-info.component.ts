import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() isLead: string;

  personalInfoForm: FormGroup;

  leadId:any=null;
  APICONSTANT: any;
  typeOfCustomerList: any = [];
  leadSourceList: any = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initPersonalForm();
    this.getMasterData();
    this.getPersonalInfo();
  }

  initPersonalForm() {
    this.personalInfoForm = this.formBuilder.group({
      typeOfCustomer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      leadSource: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      referencedBy: [null],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      projectName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      builderName: [null],
      contactNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      alternativeContactNo: [null],
      personalEmailId: [null],
      flat: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      streetName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      location: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
    });
  }
  get p() {
    return this.personalInfoForm.controls;
  }
  getMasterData() {
    let options = ['CUST_TYP', 'BUS_SRC'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['businessSource'] != null && masterData['businessSource'].length > 0
          && masterData['customerType'] != null && masterData['customerType'].length > 0) {
          this.typeOfCustomerList = masterData['customerType'];
          this.leadSourceList = masterData['businessSource'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
  savePersonal(form) {
    let param = {
      leadId : this.leadId,
      status: "LEAD",
      personalInfo: this.personalInfoForm.value
    }
    this.userService.createOrUpdateLead(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.salesFormNavigate(form);
        this.toastrService.showSuccess(res.message, this.APICONSTANT.TITLE);
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
  getPersonalInfo() {
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
        this.personalInfoForm.patchValue(res.data['personalInfo']);
      } else {
        this.toastrService.showError('No Lead Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }
}
