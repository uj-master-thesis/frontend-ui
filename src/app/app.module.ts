import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {ToastrModule} from "ngx-toastr";
import {HomeComponent} from './home/home.component';
import {PostTileComponent} from './shared/post-tile/post-tile.component';
import {SideBarComponent} from './shared/side-bar/side-bar.component';
import {MicronewsSideBarComponent} from './shared/micronews-side-bar/micronews-side-bar.component';
import {VoteButtonComponent} from './shared/vote-button/vote-button.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateThreadComponent} from './thread/create-thread/create-thread.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {ListThreadsComponent} from './thread/list-subreddits/list-threads.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {ViewPostComponent} from './post/view-post/view-post.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from "./auth/login/login.component";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {environment as env} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostTileComponent,
    LoginComponent,
    UserProfileComponent,
    SideBarComponent,
    MicronewsSideBarComponent,
    VoteButtonComponent,
    CreateThreadComponent,
    CreatePostComponent,
    ListThreadsComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    EditorModule,
    NgbModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`${env.dev.serverUrl}/api/authorize`],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  exports: [
    PostTileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
