import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-design-requirement',
  templateUrl: './design-requirement.component.html',
  styleUrls: ['./design-requirement.component.scss']
})
export class DesignRequirementComponent implements OnInit {
  designReqForm: FormGroup;

  designList:any=[];

  leadId:any=null;
  APICONSTANT: any;
  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private toastrService: CommonToastrService,private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initDesignReqForm();
    this.getMasterData();
    this.getPropertyInfo();
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
  onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.designReqForm.controls['designFile'].setValue(fileReader.result);
    }
    fileReader.readAsText(file);
  }
  savePersonal(form,status){
    let param = {
      leadId : this.leadId,
      status : status,
      designReqInfo: this.designReqForm.value
    }
    this.userService.createOrUpdateLead(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.salesFormNavigate(form);
        sessionStorage.removeItem('leadId');
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
        this.designReqForm.patchValue(res.data['designReqInfo']);
      } else {
        this.toastrService.showError('No Lead Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }
}
