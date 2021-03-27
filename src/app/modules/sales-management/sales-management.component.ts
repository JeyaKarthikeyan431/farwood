import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../auth/_services/user.service';
interface Lead {
  name: string;
  location: string;
  contactNo: string;
  email: string;
  orderedDate: string,
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
  displayedColumns: string[] = ['name', 'location', 'contactNo', 'email', 'orderedDate', 'status', 'action'];
  statusList: any = [];
  dataSource: MatTableDataSource<Lead>;
  sample: Lead[] = [{
    'name': 'mano',
    'location': 'erode',
    'contactNo': '9698006205',
    'email': 'mano@gmail.com',
    'orderedDate': '05/06/2021',
    'status': 'Active',
    'action': 'Edit'
  }]

  isleadFormVisible: boolean = false;
  iscreateLeadFormVisible: boolean = false;
  form: string;

  constructor(private userService: UserService,
    private toastrService: CommonToastrService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.isleadFormVisible = false;
    this.dataSource = new MatTableDataSource(this.sample);
    this.getMasterData();
    this.initObservable();
  }
  fnLeadFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isleadFormVisible = false;
        this.form = 'PROFILE';
        break;
      }
      case 'GO_TO_CREATE_LEAD': {
        this.isleadFormVisible = true;
        this.iscreateLeadFormVisible = true;
        this.form='LEAD';
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
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  filterBasedOnStatus(value) {
    console.log(value);
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
  editLead(){
    this.fnLeadFormVisible('GO_TO_PROFILE');
  }
  initObservable() {
    this.userService.salesNavigation$.subscribe(form => {
      if (form!=null && form!='') {
        this.fnLeadFormVisible(form);
      } else {
      }
    })
  }
}
