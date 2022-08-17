import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule {
}
