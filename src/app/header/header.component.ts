import {Component, OnInit, Inject} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileJson: string = "";
  message: string = "";

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    @Inject(DOCUMENT) private doc: Document
  ) {}


  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  signUpWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  callApi(): void {
    this.http
      .get(`${env.dev.serverUrl}Token`)
      .subscribe((result) => {
        this.message = result.toString();
      });
  }
}
