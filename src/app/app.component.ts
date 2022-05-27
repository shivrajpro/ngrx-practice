import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  panelOpenState = false;

  constructor(private store: Store<AppState>, 
    private msalService: MsalService,
    private router: Router
    ) {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);

    this.store.dispatch(autoLogin());
  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then((response)=>{
      if(response && response.account){
        this.msalService.instance.setActiveAccount(response.account);
      }
    })
    // if(!this.isLoggedIn())
    // this.msalService.loginRedirect();
  }

  isLoggedIn(){
    return this.msalService.instance.getActiveAccount() != null;
  }

  onLogin(){
    this.msalService.loginRedirect();
    // this.msalService.loginPopup().subscribe((response: AuthenticationResult)=>{
    //   this.msalService.instance.setActiveAccount(response.account);
    // },(e)=>{
    //   console.log(e);
    // })
  }

  logout(){
    this.msalService.logout();
    // this.msalService.logoutRedirect();
  }

  signOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
