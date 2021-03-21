import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { UserService } from '../auth/_services/user.service';
interface User {
  userName: string;
  departmentDesc:string;
  roleDesc: string;
  emailId: string;
  createdDate: string;
  action:string;
}

@Component({
  selector: 'app-hr-management',
  templateUrl: './hr-management.component.html',
  styleUrls: ['./hr-management.component.scss']
})
export class HrManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['userName','departmentDesc','roleDesc','emailId','createdDate','action'];
  dataSource: MatTableDataSource<User>;

  isProfileFormVisible: boolean = false;
  form: string;
  APICONSTANT:any;
  
  constructor(public userService: UserService, private toastrService : CommonToastrService,) { }

  ngOnInit(): void {
    this.APICONSTANT=this.userService.getConfig();
    this.getUsers();
  }

  fnProfileFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isProfileFormVisible = false;
        this.form = 'DASHBOARD';
        this.getUsers();
        break;
      }
      case 'GO_TO_USER': {
        this.isProfileFormVisible = true;
        this.form = 'USER';
        this.userService.getUserInfo(null);
        break;
      }
    }
  }
  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      if (res.status == 200 && res.data!=null) {
        let userData = res.data;
        this.dataSource = new MatTableDataSource(userData);
      } else {
        this.toastrService.showError(res.message,this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Users',this.APICONSTANT.TITLE);
    });
  }
  editUser(row){
    this.fnProfileFormVisible('GO_TO_USER');
    this.userService.getUserInfo(row);
  }
}
