import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';
interface MOM {
  mid: string;
  requirement: string;
  actionBy: string;
  dueDate: string;
  action: string,
}

@Component({
  selector: 'app-create-mom',
  templateUrl: './create-mom.component.html',
  styleUrls: ['./create-mom.component.scss']
})
export class CreateMomComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  momInfoForm:FormGroup;

  leadId:any=null;
  momId:any=null;
  displayedColumns: string[] = ['mid', 'requirement', 'actionBy', 'dueDate', 'action'];
  dataSource: MatTableDataSource<MOM>;
  APICONSTANT: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initMomInfoForm();
    this.getMomInfo();
    this.getMomByMomId();
  }
  initMomInfoForm() {
    this.momInfoForm = this.formBuilder.group({
      organiser: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      salesPerson: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      architect: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      designer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      client: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
      coordinator: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
    });
  }
  get m() {
    return this.momInfoForm.controls;
  }
  getMomInfo() {
    let leadId = this.authService.decrypt(sessionStorage.getItem('leadId'));
    if (leadId != null && leadId != '') {
      this.leadId=leadId;
    }else{
      this.leadId=null;
    }
  }
  saveMom(form) {
    let param = this.momInfoForm.value;
    param['leadId']=this.leadId?this.leadId:null;
    param['momId']=this.momId?this.momId:null;
    this.userService.createOrUpdateMom(param).subscribe((res: any) => {
      if (res.status == 200) {
        this.userService.momFormNavigation(form);
        sessionStorage.removeItem('momId');
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
        this.toastrService.showError('Error While Saving Mom', this.APICONSTANT.TITLE);
      }
    });
  }
  getMomByMomId(){
    let momId = this.authService.decrypt(sessionStorage.getItem('momId'));
    if (momId != null && momId != '') {
      this.momId=momId;
      this.getMomInfoById(momId);
    }else{
      this.momId=null;
    }
  }
  getMomInfoById(momId) {
    this.userService.getMomByMomId(momId).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        this.momInfoForm.patchValue(res.data);
      } else {
        this.toastrService.showError('No MOM Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }
}
