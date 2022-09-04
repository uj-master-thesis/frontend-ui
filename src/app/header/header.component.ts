import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  username!: string;
  profileJson: string = "";

  constructor(public auth: AuthService,
              private router: Router,
              @Inject(DOCUMENT) private doc: Document,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.auth.logout({returnTo: this.doc.location.origin});
  }

  callApi() {
    this.httpClient
      .get(`${env.dev.serverUrl}/api/authorize`)
      .subscribe(() => {
      });
  }
}
