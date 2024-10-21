// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// Services
import { CatService } from './services/cat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AddCatFormComponent } from './add-cat-form/add-cat-form.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
// Mat Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
// Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NavbarComponent } from "./core/navbar/navbar.component";

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatDividerModule,
];

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AddCatFormComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    AddPostDialogComponent,
    AvatarComponent,
    ImageCropperComponent,
    NavbarComponent
  ],
  imports: [
    ...MAT_MODULES,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: (): string | null => localStorage.getItem('token'),
            // allowedDomains: ['localhost:3000', 'localhost:4200']
        },
    }),
],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    PostService,
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
