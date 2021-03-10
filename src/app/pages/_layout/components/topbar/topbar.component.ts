import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../_metronic/core';
import { AuthService } from '../../../../modules/auth/_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  showLogout: boolean = false;
  user: any;

  constructor( private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.authService.decrypt(sessionStorage.getItem('user')));
  }

  logoutViewer() {
    this.showLogout = !this.showLogout;
  }

  logOut() {
    this.authService.logout().subscribe((res: any) => {
      if (res.status == 200) {
        this.resetUserInfo();
        this.redirectTo();
      } else {
      }
    }, (error: any) => {
      if (error.status == 500) {

      } else if (error.status == 204) {

      }
    });
  }
  changePassword() {
    this.router.navigate(['user/user-profile/change-password']);
    this.showLogout=false;
  }
  resetUserInfo() {
    sessionStorage.clear();
    this.showLogout=false;
  }
  redirectTo() {
    this.router.navigate(['auth/login']);
  }
}
