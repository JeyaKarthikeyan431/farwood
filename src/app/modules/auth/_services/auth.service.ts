import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  public KEY='af027f5884ec186b';
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https:/Y/brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private http:HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  login(param) {
    return this.http.post('http://183.82.249.177:9015/api/login/signIn',param);
  }

  forgotPassword(param): Observable<any> {
    return this.http.post('http://183.82.249.177:9015/api/login/forgotpassword',param);
  }
  createUser(param){
    return this.http.post('http://183.82.249.177:9015/api/login/createUser',param);
  }
  changePassword(param){
    return this.http.post('http://183.82.249.177:9015/api/login/changePassword',param);
  }
  logout():Observable<any>{
    return this.http.post('http://183.82.249.177:9015/api/login/signOut',null);
  }

  public encrypt(msg) {
    let encrypted = CryptoJS.AES.encrypt(
      msg,
      CryptoJS.enc.Utf8.parse(this.KEY),
      {
        keySize: 16,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.ECB,
      }
    );
    let transitmessage = encrypted.toString();
    return transitmessage;
  }
 
  public decrypt(transitmessage) {
      let decrypted = CryptoJS.AES.decrypt(
        transitmessage,
        CryptoJS.enc.Utf8.parse(this.KEY),
        {
          keySize: 16,
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.ECB,
        }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
}

  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

 

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
