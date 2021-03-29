import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../auth';
import { UserService } from '../auth/_services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
interface Lead {
  clientName: string;
  city: string;
  contactNo: string;
  effectiveDate: string,
  status: string,
  action: string
}
@Component({
  selector: 'app-sales-management',
  templateUrl: './sales-management.component.html',
  styleUrls: ['./sales-management.component.scss']
})
export class SalesManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  APICONSTANT: any;
  displayedColumns: string[] = ['clientName', 'city', 'contactNo', 'effectiveDate', 'status', 'action'];
  statusList: any = [];
  dataSource: MatTableDataSource<Lead>;

  isleadFormVisible: boolean = false;
  iscreateLeadFormVisible: boolean = false;
  form: string;
  filterFormGroup: FormGroup

  constructor(private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.isleadFormVisible = false;
    this.getMasterData();
    this.initObservable();
    this.getAllLeads();
    this.initfiterForm();
  }

  fnLeadFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isleadFormVisible = false;
        this.form = 'PROFILE';
        this.getAllLeads();
        break;
      }
      case 'GO_TO_CREATE_LEAD': {
        this.isleadFormVisible = true;
        this.iscreateLeadFormVisible = true;
        this.form = 'LEAD';
        sessionStorage.removeItem('leadId');
        break;
      }
      case 'GO_TO_PROFILE': {
        this.isleadFormVisible = true;
        this.form = 'PROFILE';
        break;
      }
      case 'GO_TO_PROPERTY': {
        this.form = 'PROPERTY';
        break;
      }
      case 'GO_TO_BASIC': {
        this.form = 'BASIC';
        break;
      }
      case 'GO_TO_UPLOAD': {
        this.form = 'UPLOAD';
        break;
      }
      case 'GO_TO_SUMMARY': {
        this.isleadFormVisible = true;
        this.form = 'SUMMARY';
        break;
      }
      case 'GO_TO_MOM': {
        this.isleadFormVisible = true;
        this.form = 'MOM';
        break;
      }
    }
  }
initfiterForm(){

  this.filterFormGroup = this.formBuilder.group({
    filter: [''],
    status: ['']
  });
}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  filterBasedOnStatus(value) {
   let filterValue = value.source.selected.viewValue;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getMasterData() {
    let options = ['LEAD_STATUS'];
    let param = {
      multipleOptionType: options
    }
    this.userService.getAllMasterData(param).subscribe((res: any) => {
      if (res.status == 200) {
        let masterData = res.data;
        if (masterData['leadStatus'] != null && masterData['leadStatus'].length > 0) {
          this.statusList = masterData['leadStatus'];
        }
      } else {
        this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error while getting Master data', this.APICONSTANT.TITLE);
    });
  }
  editLead(row) {
    this.fnLeadFormVisible('GO_TO_PROFILE');
    if (row.leadId != null && row.leadId != '') {
    sessionStorage.setItem('leadId', this.authService.encrypt(row.leadId));
    }else {
      this.toastrService.showError('Parameter Missing For Get Lead', this.APICONSTANT.TITLE);
    }
  }
  initObservable() {
    this.userService.salesNavigation$.subscribe(form => {
      if (form != null && form != '') {
        this.fnLeadFormVisible(form);
      } else {
      }
    })
  }
  getAllLeads() {
    this.userService.getAllLeads().subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        let leads = res.data;
        this.dataSource = new MatTableDataSource(leads);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.toastrService.showError('No Leads Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Leads', this.APICONSTANT.TITLE);
    });
  }
  viewLead(row){
    sessionStorage.setItem('leadId', this.authService.encrypt(row.leadId));
    this.fnLeadFormVisible('GO_TO_SUMMARY');
  }
  goToMOM(row){
    this.fnLeadFormVisible('GO_TO_MOM');
  }
  OnResetFilterForm(){
    this.filterFormGroup.reset();
    this.getAllLeads();
  }
}
