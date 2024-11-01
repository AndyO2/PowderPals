// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Services
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { ResortsComponent } from './resorts/resorts.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResortDetailComponent } from './resorts/resort-detail/resort-detail.component';
import { CreateGroupPageComponent } from './group/create-group-page/create-group-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-group', component: CreateGroupPageComponent },
  { path: 'resort/:id', component: ResortDetailComponent },
  { path: 'resorts', component: ResortsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardLogin],
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
