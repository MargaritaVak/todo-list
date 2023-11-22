import { Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [ 
    { path: 'register', component: RegisterPageComponent }, 
    { path: 'auth', component: AuthPageComponent },
    { path:'', component: MainPageComponent}
];

