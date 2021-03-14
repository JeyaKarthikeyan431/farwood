import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  displayedColumns: string[] = ['name', 'location', 'contactNo', 'email', 'orderedDate', 'status', 'action'];
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
  form: string;

  constructor() { }

  ngOnInit(): void {
    this.isleadFormVisible = false;
    this.dataSource = new MatTableDataSource(this.sample);
  }
  fnLeadFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isleadFormVisible = false;
        this.form = 'PROFILE';
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
}
