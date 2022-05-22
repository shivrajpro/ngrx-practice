import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutTimeOutId:any;

  constructor(private http: HttpClient) {}
  signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key";

  loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key";

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `${this.loginUrl}=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `${this.signUpUrl}=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );

    return user;
  }

  setUserInLocalStorage(user:User){
    localStorage.setItem('userData',JSON.stringify(user));
    this.runTimeOutInterval(user);
  }

  runTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expriryDate.getTime();
    const diff = expirationDate - todaysDate;

    this.logoutTimeOutId = setTimeout(() => {
      // logout functionality or get the refresh token
    }, diff);
  }

  getUserFromLocalStorage(){
    const userDataStr = localStorage.getItem('userData');

    if(userDataStr){
      const userData = JSON.parse(userDataStr);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(userData.email, userData.token, userData.localId, expirationDate);

      this.runTimeOutInterval(user);
      return user;
    }

    return null;
  }
}
