import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import {  first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { error } from '@angular/compiler/src/util';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  public auth2: any;
  
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initLoginForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

  get l() {
    return this.loginForm.controls;
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8),
        ]),
      ],
    });
  }

  signIn() {
    let loginParam={
      emailId:this.l.email.value,
      password:this.l.password.value
    }
    this.hasError = false;
     this.authService.login(loginParam).subscribe((res:any) => {
        if (res.status==200) {
          this.router.navigate(['user/dashboard']);
        } else {
          this.hasError = true;
        }
      },(error:any)=>{
        this.router.navigate(['user/dashboard']);
        this.hasError = true;
        if(error.status==500){

        }else if(error.status==204){
          
        }
      });
  }
  goToForgotPassword(){
    this.router.navigate(['/auth/forgot-password']);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  private scope = [
    'profile',
    'email',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');
  
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '718370376033-60d3mfjg6g9eo5d6rciueni808sqa3ks.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        sessionStorage.setItem('accessToken', googleUser.getAuthResponse().id_token);
        //YOUR CODE HERE
        this.resolve();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

ngAfterViewInit(){
      this.googleInit();
    //  this.initGoogleOAuth();
}

initGoogleOAuth(): Promise<any> {
  return new Promise((resolve, reject) => {
      gapi.load('auth2', async () => {
          const gAuth = await gapi.auth2.init({
              client_id: '718370376033-60d3mfjg6g9eo5d6rciueni808sqa3ks.apps.googleusercontent.com',
              fetch_basic_profile: true,
              scope: this.scope
          });
          resolve(gAuth);
      }, reject);
  });
}

resolve(): Observable<any> | Promise<any> | any {
  return new Promise((resolve, reject) => {
      gapi.load('client', () => {
         // gapi.client.setToken({ access_token: sessionStorage.getItem('accessToken') });
          gapi.client.init({
               apiKey: 'AIzaSyA0Yz5UnpNz9PcYD4k11XbWHNyOGBkvhiY',
              clientId: '718370376033-60d3mfjg6g9eo5d6rciueni808sqa3ks.apps.googleusercontent.com',
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
              scope: 'https://mail.google.com/'
          });

          gapi.client.load('gmail', 'v1', () => {
              Promise.all([
                  this.loadMessages(),
                  this.loadLabels()
              ]).then(
                  (res) => {
                     console.log(res);
                     resolve(res)
                  },
                  reject
              );
          });
      });
  });
}

// ...
private pageTokens: Array<string | number | null> = [null];
loadMessages(labelIds: string[]=[], pageNumber: number = 0, searchText: string = ''): Promise<any> {
return new Promise((resolve, reject) => {
      gapi.client.gmail.users.messages.list({
          userId: 'Me',
         // format: 'full',
         // maxResults: 50,
         // labelIds: labelIds,
         // pageToken: this.pageTokens[pageNumber],
          //q: searchText,
          access_token:sessionStorage.getItem('accessToken')
      }).then(res => {
        console.log(res);
          // store page tokens in array to navigate back & forth, 
          // do something with the list
          resolve(res);
      }).catch(err => {
         // handle error
          reject(err);
      });
  });
}
  
loadLabels(): Promise<any> {
    return new Promise((resolve, reject) => {
        gapi.client.gmail.users.labels.list({
            userId: 'me',
            format: 'full',
            maxResults: 15
        }).then(async labelList => {
            // loop through label list, 
            // get single label (using Gmail API method 'gapi.client.gmail.users.labels.get') 
            // push detailed label data to array
            console.log(labelList);
            resolve(labelList);
        }).catch(err => {
            reject(err);
        });
    });
}
login(){
  this.router.navigate(['/dashboard']);
}
}
