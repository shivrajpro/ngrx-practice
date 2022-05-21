import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { loginStart, loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({message:''}));
            return loginSuccess({ user });
          }),
          catchError((errorRes) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // console.log('ERROR', errorRes.error.error.message);
            const msg = errorRes.error.error.message || '';
            return of(setErrorMessage({message:msg}));
          })
        );
      })
    );
  });
}
