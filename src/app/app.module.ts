import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthEffects } from "./auth/state/auth.effects";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from "./shared/components/header/header.component";
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { appReducer } from "./store/app.state";
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { MsalService, MSAL_INSTANCE } from "@azure/msal-angular";
import { AuthInterceptor } from "./services/auth-interceptor.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { IsAuthorizedDirective } from "./shared/directives/authorized.directive";
import { CustomSerializer } from "./store/router/custom.serializer";
import { EntityDataModule } from "@ngrx/data";
import { entityConfig } from "./entity-metadata";
import { NgChartsModule } from "ng2-charts";
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth:{
      clientId:'bc0e6bfb-f8d6-4ed1-aad9-3d5a27522863',
      redirectUri:'http://localhost:4200/'
    }
  })
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    PublicPageComponent,
    RestrictedPageComponent,
    IsAuthorizedDirective
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    // 'counter' will be used to select in every component as required
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    MaterialModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory:MSALInstanceFactory
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
