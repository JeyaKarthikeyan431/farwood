import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';
import { MomActionComponent } from '../mom-action/mom-action.component';
interface MOM {
  requirement: string;
  actionBy: string;
  createdDate: string;
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

  momInfoForm: FormGroup;

  leadId: any = null;
  momId: any = null;
  displayedColumns: string[] = ['requirement', 'actionBy', 'createdDate', 'action'];
  dataSource: MatTableDataSource<MOM>;
  APICONSTANT: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.initMomInfoForm();
    this.getMomInfo();
    this.getMomByMomId();
  }
  initMomInfoForm() {
    this.momInfoForm = this.formBuilder.group({
      organiser: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      salesPerson: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      architect: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      designer: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      client: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
      coordinator: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(150)])],
    });
  }
  get m() {
    return this.momInfoForm.controls;
  }
  getMomInfo() {
    let leadId = this.authService.decrypt(sessionStorage.getItem('leadId'));
    if (leadId != null && leadId != '') {
      this.leadId = leadId;
    } else {
      this.leadId = null;
    }
  }
  saveMom(form) {
    let param = this.momInfoForm.value;
    param['leadId'] = this.leadId ? this.leadId : null;
    param['momId'] = this.momId ? this.momId : null;
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
  getMomByMomId() {
    let momId = this.authService.decrypt(sessionStorage.getItem('momId'));
    let momFlow=this.authService.decrypt(sessionStorage.getItem('mom-flow'));
    if (momId != null && momId != '' ) {
      this.momId = momId;
      this.loadAllMomActionByMomId();
      if(momFlow=='UPDATE'){
        this.getMomInfoById(momId);
      }
    } else {
      this.momId = null;
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
  addAction() {
  let dialogRef=  this.dialog.open(MomActionComponent, {
      data: { momId: this.momId },
      width: '600px',
      height: '600px'
    })
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadAllMomActionByMomId();
      }
  });
  }
  loadAllMomActionByMomId(){
    this.userService.loadAllMomActionByMomId(this.momId).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        let leads = res.data;
        this.dataSource = new MatTableDataSource(leads);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.toastrService.showError('No MOM Action Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting MOM Actions', this.APICONSTANT.TITLE);
    });
  }
}
