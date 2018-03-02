import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DndModule} from 'ng2-dnd';
import { CustomFormsModule } from 'ng2-validation';
// Routes
import { app_routing } from './app.routes';

// Services
import { replanAPIService } from './services/replanAPI.service';
import { replanAPIUserService } from './services/replanAPIUser.service';
import { GlobalDataService } from './services/globaldata.service';
import { AuthenticationService} from './services/AuthenticationService';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { PlanComponent } from './components/plan/plan.component';
import { ProjectSettingsComponent } from './components/projectSettings/projectsettings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmationRegistrationComponent } from './components/confirmation-registration/confirmation-registration.component';
import { SendValidationAgainComponent } from './components/send-validation-again/send-validation-again.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './AuthGuard';

@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProjectComponent,
    PlanComponent,
    ProjectSettingsComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmationRegistrationComponent,
    SendValidationAgainComponent,
    ForgetPasswordComponent,
    MainPageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    HttpModule,
    app_routing,
    DndModule.forRoot()
  ],
  providers: [
    replanAPIService,
    replanAPIUserService,
    AuthenticationService,
    GlobalDataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
