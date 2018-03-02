import { RouterModule, Routes } from '@angular/router';
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
import { PerfileAtributesComponent } from './components/perfile-atributes/perfile-atributes.component';
import { PerfileModifyPasswordComponent } from './components/perfile-modify-password/perfile-modify-password.component';


const app_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'projects/:id/settings', component: ProjectSettingsComponent },
  { path: 'projects/:id/releases/:id2/plan', component: PlanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmation/:token', component: ConfirmationRegistrationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'send_validation', component: SendValidationAgainComponent },
  { path: 'send_new_password', component: ForgetPasswordComponent },
  { path: 'home', component: MainPageComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: PerfileAtributesComponent, canActivate: [AuthGuard]},
  { path: 'profile/modifyPassword', component: PerfileModifyPasswordComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: '' }
  
];

export const app_routing = RouterModule.forRoot(app_routes);
