import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { authReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selectors';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent }
    ]
  }
];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule.forChild(routes),
    StoreModule.forFeature(AUTH_STATE_NAME, authReducer)
  ],
})
export class AuthModule {}
