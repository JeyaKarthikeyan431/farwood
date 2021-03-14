import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CommonToastrService {

  constructor(private toastrService :ToastrService) { }

  showSuccess(message, title) {
    this.toastrService.success(message, title)
  }

  showError(message, title) {
    this.toastrService.error(message, title)
  }

  showInfo(message, title) {
    this.toastrService.info(message, title)
  }

  showWarning(message, title) {
    this.toastrService.warning(message, title)
  }
}
