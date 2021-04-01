import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
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

  APICONSTANT: any;
  isMomFormVisible: boolean = false;
  leadId:any=null;

  constructor(public router: Router,private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.isMomFormVisible = false;
    this.getMomInfo();
    this.initObservable();
  }
  fnMomFormVisible(option) {
    switch (option) {
      case 'GO_TO_DASHBOARD': {
        this.isMomFormVisible = false;
        this.removeSession();
        this.getAllMOM();
        break;
      }
      case 'GO_TO_MOM': {
        this.isMomFormVisible = true;
        this.removeSession();
        break;
      }
      case 'GO_TO_MOM_UPDATE': {
        this.isMomFormVisible = true;
        break;
      }
    }
  }
  redirectTo(form){
    this.userService.salesFormNavigate(form);
  }
  getMomInfo() {
    let leadId = this.authService.decrypt(sessionStorage.getItem('leadId'));
    if (leadId != null && leadId != '') {
      this.leadId=leadId;
      this.getAllMOM();
    }else{
      this.leadId=null;
    }
  }
  getAllMOM() {
    this.userService.getAllMom(this.leadId).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        let leads = res.data;
        this.dataSource = new MatTableDataSource(leads);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.toastrService.showError('No MOM Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting MOM', this.APICONSTANT.TITLE);
    });
  }
  initObservable() {
    this.userService.momNavigation$.subscribe(form => {
      if (form != null && form != '') {
        this.fnMomFormVisible(form);
      } else {
      }
    })
  }
  editMom(row){
    sessionStorage.setItem('momId', this.authService.encrypt(row.momId));
    sessionStorage.setItem('mom-flow', this.authService.encrypt('UPDATE'));
    this.fnMomFormVisible('GO_TO_MOM_UPDATE');
  }
  removeSession(){
    sessionStorage.removeItem('momId');
    sessionStorage.removeItem('mom-flow');
  }
}
