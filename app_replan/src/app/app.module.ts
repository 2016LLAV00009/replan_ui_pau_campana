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
import { AuthGuardAdmin } from './AuthGuardAdmin';
import { NavbarLoggedInComponent } from './components/shared/navbar-logged-in/navbar-logged-in.component';
import { SidePerfileComponent } from './components/shared/side-perfile/side-perfile.component';
import { PerfileAtributesComponent } from './components/perfile-atributes/perfile-atributes.component';
import { PerfileModifyPasswordComponent } from './components/perfile-modify-password/perfile-modify-password.component';
import { PerfileOtherAccountsComponent } from './components/perfile-other-accounts/perfile-other-accounts.component';
import { PerfileSkillsComponent } from './components/perfile-skills/perfile-skills.component';
import { PerfileAvailabilityComponent } from './components/perfile-availability/perfile-availability.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminProjectComponent } from './components/admin-project/admin-project.component';

import { AdminComponent } from './components/admin/admin.component';

import { HomeComponent } from './components/home/home.component';

@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectComponent,
    PlanComponent,
    ProjectSettingsComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmationRegistrationComponent,
    SendValidationAgainComponent,
    ForgetPasswordComponent,
    MainPageComponent,
    NavbarLoggedInComponent,
    SidePerfileComponent,
    PerfileAtributesComponent,
    PerfileModifyPasswordComponent,
    PerfileOtherAccountsComponent,
    PerfileSkillsComponent,
    PerfileAvailabilityComponent,
    AdminUserComponent,
    AdminProjectComponent
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
    AuthGuard,
    AuthGuardAdmin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
