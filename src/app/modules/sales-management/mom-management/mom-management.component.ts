import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../auth/_services/user.service';

interface leadMOM {
  client: string;
  organiser:string;
  salesPerson: string;
  architect: string;
  createdDate: string;
  action:string;
}


@Component({
  selector: 'app-mom-management',
  templateUrl: './mom-management.component.html',
  styleUrls: ['./mom-management.component.scss']
})
export class MomManagementComponent implements OnInit {
  dataSource: MatTableDataSource<leadMOM>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['client','organiser','salesPerson','architect','createdDate','action'];

  isMomFormVisible: boolean = false;

  constructor(public router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.isMomFormVisible = false;
  }
  fnMomFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isMomFormVisible = false;
        break;
      }
      case 'GO_TO_MOM': {
        this.isMomFormVisible = true;
        break;
      }
    }
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }

}
