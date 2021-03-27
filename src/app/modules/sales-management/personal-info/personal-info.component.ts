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
  }

  initPersonalForm() {
    this.personalInfoForm = this.formBuilder.group({
      typeOfCustomer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      leadSource: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      referencedBy: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      projectName: [null],
      contactNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      alternativeContactNo: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      personalEmailId: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      flat: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      streetName: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      location: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
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
  redirectToPropertyInfo(){
    this.userService.salesFormNavigate('GO_TO_PROPERTY');
  }
}
