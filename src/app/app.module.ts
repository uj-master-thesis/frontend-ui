import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
// import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {ToastrModule} from "ngx-toastr";
import {TokenInterceptor} from "./token-interceptor";
import {HomeComponent} from './home/home.component';
import {PostTileComponent} from './shared/post-tile/post-tile.component';
import {SideBarComponent} from './shared/side-bar/side-bar.component';
import {MicronewsSideBarComponent} from './shared/micronews-side-bar/micronews-side-bar.component';
import {VoteButtonComponent} from './shared/vote-button/vote-button.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateSubredditComponent} from './subreddit/create-subreddit/create-subreddit.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {ListSubredditsComponent} from './subreddit/list-subreddits/list-subreddits.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './post/view-post/view-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from "./auth/login/login.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
// import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostTileComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    SideBarComponent,
    MicronewsSideBarComponent,
    VoteButtonComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AuthModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    FontAwesomeModule,
    BrowserAnimationsModule,
    EditorModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    PostTileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
