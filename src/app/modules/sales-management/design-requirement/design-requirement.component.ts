import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-design-requirement',
  templateUrl: './design-requirement.component.html',
  styleUrls: ['./design-requirement.component.scss']
})
export class DesignRequirementComponent implements OnInit {
  designReqForm: FormGroup;

  designList:any=[];

  APICONSTANT: any;
  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private toastrService: CommonToastrService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initDesignReqForm();
    this.getMasterData();
  }

  initDesignReqForm() {
    this.designReqForm = this.formBuilder.group({
      architectName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      contactNo: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      emailId: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)])],
      design:[null, Validators.compose([Validators.required])],
      designFile: [null, Validators.compose([Validators.required])],
      isDesignCompleted: [null, Validators.compose([Validators.required])],
    });
  }
  get d() {
    return this.designReqForm.controls;
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }
  getMasterData() {
    let options = ['SRC_DOC'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['srcDoc'] != null && masterData['srcDoc'].length > 0) {
          this.designList = masterData['srcDoc'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
}
