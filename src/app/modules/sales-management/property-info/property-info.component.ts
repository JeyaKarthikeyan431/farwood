import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
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

  APICONSTANT: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CommonToastrService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initPropertyInfoForm();
    this.getMasterData();
  }
  initPropertyInfoForm() {
    this.propertyInfoForm = this.formBuilder.group({
      lookingFor: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      typeOfProperty: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      propertyName: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      builderName: [null, Validators.compose([Validators.required])],
      buildingState: [null, Validators.compose([Validators.required])],
      expectedDate: [null],
      flat: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      streetName: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      city: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
      location: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10)])],
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
}
