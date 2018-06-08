import { RouterModule, Routes } from '@angular/router';
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
import { PerfileOtherAccountsComponent } from './components/perfile-other-accounts/perfile-other-accounts.component';
import { PerfileSkillsComponent } from './components/perfile-skills/perfile-skills.component';
import { PerfileAvailabilityComponent } from './components/perfile-availability/perfile-availability.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminProjectComponent } from './components/admin-project/admin-project.component';
import { AuthGuardAdmin } from './AuthGuardAdmin';



const app_routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'projects/:id', component: ProjectComponent, canActivate: [AuthGuard]},
  { path: 'projects/:id/settings', component: ProjectSettingsComponent },
  { path: 'projects/:id/releases/:id2/plan', component: PlanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirmation/:token', component: ConfirmationRegistrationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'send_validation', component: SendValidationAgainComponent },
  { path: 'send_new_password', component: ForgetPasswordComponent },
  { path: 'profile', component: PerfileAtributesComponent, canActivate: [AuthGuard]},
  { path: 'profile/modifyPassword', component: PerfileModifyPasswordComponent, canActivate: [AuthGuard]},
  { path: 'profile/otherAccounts', component: PerfileOtherAccountsComponent, canActivate: [AuthGuard]},
  { path: 'profile/skills', component: PerfileSkillsComponent, canActivate: [AuthGuard]},
  { path: 'profile/availability', component: PerfileAvailabilityComponent, canActivate: [AuthGuard]},
  { path: 'admin/user', component: AdminUserComponent, canActivate: [AuthGuardAdmin]},
  { path: 'admin/project', component: AdminProjectComponent, canActivate: [AuthGuardAdmin]},



  { path: '**', pathMatch: 'full', redirectTo: '' }
  
];

export const app_routing = RouterModule.forRoot(app_routes);
