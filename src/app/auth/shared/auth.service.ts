import {Injectable} from '@angular/core';
import {SignupRequestPayload} from '../sign-up/signup-request.payload';
import {map, Observable, of, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginRequestPayload} from "../login/login-request.payload";
import {LoginResponsePayload} from "../login/login-response.payload";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  // signup(signupRequestPayload: SignupRequestPayload | undefined): Observable<any> {
  //   return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload);
  // }

  signup(signupRequestPayload: SignupRequestPayload | undefined): Observable<any> {
    return of({ status: 200, data: {} });
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
    console.log(":efewwe")
    this.localStorage.store('authenticationToken', 'someRandomAuthenticationTokenValue1323');
    this.localStorage.store('username', loginRequestPayload.username);
    this.localStorage.store('refreshToken', 'someRandomRefreshTokenValue1323');
    this.localStorage.store('expiresAt', time);
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
    const loginResponsePayload :LoginResponsePayload = {
      authenticationToken: '12'+date.toDateString(),
      refreshToken: '2133',
      expiresAt: date,
      username: 'pator'
    };
    return of(loginResponsePayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
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

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }
}
