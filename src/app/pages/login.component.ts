import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { SuperForm } from 'angular-super-validator';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClientService } from '../providers/http/http-client.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public formGroup: FormGroup;

  get username(): FormControl { return this.formGroup.get('username') as FormControl; }
  get password(): FormControl { return this.formGroup.get('password') as FormControl; }

  constructor(
    private http: HttpClientService,
    private router: Router
  ) {
    this.formGroup = UserInterface.newLoginForm();
  }

  /**
   * Login with current user/pass
   */
  public login(): void {

    if (this.formGroup.valid) {
      this.formGroup.disable();
      // -->Set: data
      const data = this.formGroup.getRawValue();
            data.grant_type = 'password';

      this.http.login(data)
          .subscribe(ok => {

            this.router.navigate(['/dashboard']);

          }, err => {
            console.error('error', err);
            setTimeout(() => { this.formGroup.enable(); }, 1500);
          });
    } else {
      const errors = SuperForm.getAllErrorsFlat(this.formGroup);
      console.error(errors);
    }
  }
}
