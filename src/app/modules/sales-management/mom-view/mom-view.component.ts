import { Component, OnInit } from '@angular/core';
import { CommonToastrService } from 'src/app/shared/toater/common-toastr.service';
import { AuthService } from '../../auth';
import { UserService } from '../../auth/_services/user.service';

@Component({
  selector: 'app-mom-view',
  templateUrl: './mom-view.component.html',
  styleUrls: ['./mom-view.component.scss']
})
export class MomViewComponent implements OnInit {
  momId: any;
  APICONSTANT: any;
  momInfo: any;

  constructor(private userService: UserService,
    private toastrService: CommonToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.APICONSTANT = this.userService.getConfig();
    this.getMomByMomId();
  }
  getMomByMomId() {
    let momId = this.authService.decrypt(sessionStorage.getItem('momId'));
    let momFlow = this.authService.decrypt(sessionStorage.getItem('mom-flow'));
    if (momId != null && momId != '') {
      this.momId = momId;
      if (momFlow == 'VIEW') {
        this.getMomInfoById(momId);
      }
    } else {
      this.momId = null;
    }
  }
  getMomInfoById(momId) {
    this.userService.getMomByMomId(momId).subscribe((res: any) => {
      if (res.status == 200 && res.data != null) {
        this.momInfo = res.data;
        console.log(this.momInfo)
      } else {
        this.toastrService.showError('No MOM Found', this.APICONSTANT.TITLE);
      }
    }, (error: any) => {
      this.toastrService.showError('Error While Getting Lead', this.APICONSTANT.TITLE);
    });
  }
}
