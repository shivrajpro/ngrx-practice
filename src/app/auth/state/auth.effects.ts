import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { autoLogin, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError((errorRes) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // console.log('ERROR', errorRes.error.error.message);
            const msg = errorRes.error.error.message || '';
            return of(setErrorMessage({ message: msg }));
          })
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return signupSuccess({ user });
          }),
          catchError((errorRes) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // console.log('ERROR', errorRes.error.error.message);
            const msg = errorRes.error.error.message || '';
            return of(setErrorMessage({ message: msg }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        // ofType(loginSuccess),
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false } // this effect will not return anything
  );

  autoLogin$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(autoLogin),
      map((action)=>{
        const user =this.authService.getUserFromLocalStorage();
        console.log(user);
      })
    )
  },
  {dispatch: false}
  );

  // signupRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(signupSuccess),
  //       tap((action) => {
  //         this.router.navigate(['/']);
  //       })
  //     );
  //   },
  //   { dispatch: false } // this effect will not return anything
  // );
}
