import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { UserService } from 'src/app/modules/auth/_services/user.service';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { LayoutService } from '../../../../_metronic/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  menuList:any=[];
  APICONSTANT: any;

  constructor(private layout: LayoutService, private loc: Location,
    private router: Router,private authService: AuthService,
     private toastrService : CommonToastrService,private userService: UserService) { }

  ngOnInit(): void {
    // load view settings
    this.APICONSTANT = this.userService.getConfig();
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    // Routing
    this.location = this.loc;
    this.loadMenu();
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/logo-light.png';
    }
  }
  redirectTo(subMenu){
   let subMenuConfig= this.APICONSTANT.MENU;
   let url=subMenuConfig[subMenu.subMenuId];
   this.router.navigate([url]);
  }
  loadMenu() {
    let user = JSON.parse(this.authService.decrypt(sessionStorage.getItem('user')));
    if (user != null && user != '') {
        this.menuList=user['menus'];
    }else{
      this.toastrService.showSuccess('No Access Provided For this User','Success');
    }
  }
}
