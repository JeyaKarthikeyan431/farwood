import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl) {
    const password = control.get('newPassword').value;
    const confirmPassword = control.get('confirmNewPassword').value;

    if (password !== confirmPassword) {
      control.get('confirmNewPassword').setErrors({ confirmPassword: true });
    } else {
      return null;
    }
  }
}
