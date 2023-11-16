import { Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

export const routes: Routes = [ 
    { path: 'register', component: RegisterPageComponent }, 
    { path: '', component: AuthPageComponent },];
