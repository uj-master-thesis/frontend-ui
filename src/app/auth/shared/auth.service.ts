import {EventEmitter, Injectable, Output} from '@angular/core';
import {SignupRequestPayload} from '../sign-up/signup-request.payload';
import {Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginRequestPayload} from "../login/login-request.payload";
import {LoginResponsePayload} from "../login/login-response.payload";
import {LocalStorageService} from "ngx-webstorage";

//TODO: add real http requests when service will be ready
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  // signup(signupRequestPayload: SignupRequestPayload | undefined): Observable<any> {
  //   return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload);
  // }

  signup(signupRequestPayload: SignupRequestPayload | undefined): Observable<any> {
    return of({status: 200, data: {}});
  }

  // login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
  //   return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
  //     .pipe(map(data => {
  //       this.localStorage.store('authenticationToken', data.authenticationToken);
  //       this.localStorage.store('username', data.username);
  //       this.localStorage.store('refreshToken', data.refreshToken);
  //       this.localStorage.store('expiresAt', data.expiresAt);
  //       return true;
  //     }));
  // }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    const time = new Date();
    time.setMinutes(time.getMinutes() + 5)
    console.log("trying login")
    this.localStorage.store('authenticationToken', 'someRandomAuthenticationTokenValue1323');
    this.localStorage.store('username', loginRequestPayload.username);
    this.localStorage.store('refreshToken', 'someRandomRefreshTokenValue1323');
    this.localStorage.store('expiresAt', time);
    this.loggedIn.emit(true);
    this.username.emit(loginRequestPayload.username);
    return of(true);
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    // return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token',
    //   refreshTokenPayload)
    //   .pipe(tap(response => {
    //     this.localStorage.store('authenticationToken', response.authenticationToken);
    //     this.localStorage.store('expiresAt', response.expiresAt);
    //   }));
    const date = new Date();
    date.setMinutes(date.getMinutes() + 7)
    const loginResponsePayload: LoginResponsePayload = {
      authenticationToken: '12' + date.toDateString(),
      refreshToken: '2133',
      expiresAt: date,
      username: 'pator'
    };
    return of(loginResponsePayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    // this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
    //   { responseType: 'text' })
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     throwError(error);
    //   })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
