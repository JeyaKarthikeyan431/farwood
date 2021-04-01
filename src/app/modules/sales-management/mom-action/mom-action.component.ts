import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-mom-action',
  templateUrl: './mom-action.component.html',
  styleUrls: ['./mom-action.component.scss']
})
export class MomActionComponent implements OnInit {
  momActionInfoForm: FormGroup;

  momId: any;
  APICONSTANT: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CommonToastrService, public dialogRef: MatDialogRef<MomActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.momId = data.momId;
    console.log(data);
  }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initMomActionInfoForm();
  }
  initMomActionInfoForm() {
    this.momActionInfoForm = this.formBuilder.group({
      actionBy: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      actionDatePicker: [null],
      requirement:[null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(300)])]
    });
  }
  get a() {
    return this.momActionInfoForm.controls;
  }
  cancelAction() {
    this.dialogRef.close(false);
  }
  addAction() {
    let param = this.momActionInfoForm.value;
    param['momId'] = this.momId ? this.momId : null;
    this.userService.createOrUpdateMomAction(param).subscribe((res: any) => {
      if (res.status == 200) {
        sessionStorage.removeItem('momId');
        this.dialogRef.close(true);
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
        this.toastrService.showError('Error While Saving Mom Action', this.APICONSTANT.TITLE);
      }
    });
  }
}
