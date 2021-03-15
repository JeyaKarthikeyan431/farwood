import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  name: string;
  doj: string;
  role: string;
  location: string;
  status: string,
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'doj', 'role', 'location', 'status'];
  dataSource: MatTableDataSource<User>;
  sample: User[] = [{
    'name': 'mano',
    'doj': '05/06/2021',
    'role': 'Engineer',
    'location': 'Erode',
    'status': 'Active',
  }]

  isUserFormVisible: boolean = false;
  form: string;
  constructor() { }

  ngOnInit(): void { 
    this.isUserFormVisible = false;
    this.dataSource = new MatTableDataSource(this.sample);
  }

  fnUserFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isUserFormVisible = false;
        this.form = 'DASHBOARD';
        break;
      }
      case 'GO_TO_USER': {
        this.isUserFormVisible = true;
        this.form = 'USER';
        break;
      }
    }
  }
}
