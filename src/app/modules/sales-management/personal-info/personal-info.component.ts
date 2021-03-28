import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() isLead: string;
 
  personalInfoForm: FormGroup;

  APICONSTANT: any;
  typeOfCustomerList:any=[];
  leadSourceList:any=[];

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private toastrService: CommonToastrService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initPersonalForm();
    this.getMasterData();
    this.initObservable();
  }

  initPersonalForm() {
    this.personalInfoForm = this.formBuilder.group({
      typeOfCustomer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      leadSource: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      referencedBy: [null],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      projectName: [null,Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      builderName:[null],
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
    let options = ['CUST_TYP','BUS_SRC'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['businessSource'] != null && masterData['businessSource'].length > 0
        && masterData['customerType'] != null && masterData['customerType'].length > 0 ) {
          this.typeOfCustomerList = masterData['customerType'];
          this.leadSourceList=masterData['businessSource'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }
  savePersonal(){
    let param = {
      status : "LEAD",
      personalInfo: this.personalInfoForm.value
    }
    this.userService.createOrUpdateLead(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.salesFormNavigate('GO_TO_DASHBOARD');
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
  initObservable() {
    this.userService.leadInfo$.subscribe(data => {
      if (data!=null) {
        this.personalInfoForm.patchValue(data['personalInfo']);
      } 
    })
  }
}
