import { Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MainPageComponent } from './todo-list/main-page/main-page.component';
import { authGuard} from './auth.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterPageComponent, canActivate:[authGuard]  },
    { path: '', component: AuthPageComponent, canActivate:[authGuard] },
    { path:'main', component: MainPageComponent},


];

