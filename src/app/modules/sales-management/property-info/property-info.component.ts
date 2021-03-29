import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss']
})
export class PropertyInfoComponent implements OnInit {
  propertyInfoForm: FormGroup;

  lookingForList: any = [];
  propertyList: any = [];

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

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initPropertyInfoForm();
    this.getMasterData();
    this.getPropertyInfo();
  }
  initPropertyInfoForm() {
    this.propertyInfoForm = this.formBuilder.group({
      lookingFor: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      typeOfProperty: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      propertyName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      builderName: [null, Validators.compose([Validators.required])],
      buildingState: [null, Validators.compose([Validators.required])],
      expectedDate: [null],
      flat: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      streetName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      location: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
    });
  }
  get p() {
    return this.propertyInfoForm.controls;
  }
  redirectTo(form) {
    this.userService.salesFormNavigate(form);
  }

  getMasterData() {
    let options = ['PROP_TYPE', 'SRC_LOK_FOR'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['propertyType'] != null && masterData['propertyType'].length > 0
          && masterData['srcLookingFor'] != null && masterData['srcLookingFor'].length > 0) {
          this.propertyList = masterData['propertyType'];
          this.lookingForList = masterData['srcLookingFor'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
  savePersonal(form){
    let param = {
      leadId : this.leadId,
      status : "QLP",
      propertyInfo: this.propertyInfoForm.value
    }
    this.userService.createOrUpdateLead(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.salesFormNavigate(form);
      } else {
        this.toastrService.showError(res.message, this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.userService.salesFormNavigate(form);
      if (error.status == 500) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else if (error.status == 204) {
        this.toastrService.showError(error.message, this.APICONSTANT.TITLE);
      } else {
        this.toastrService.showError('Error While Creating Lead', this.APICONSTANT.TITLE);
      }
    });
  }
  getPropertyInfo() {
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
        this.propertyInfoForm.patchValue(res.data['propertyInfo']);
      } else {
        this.toastrService.showError('No Lead Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }
  
}
