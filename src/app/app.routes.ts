import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'hello/neighbors', component: LandingComponent },
    { path: 'hello/neighbors/signup', component: SignupComponent },
    { path: 'hello/neighbors/login', component: LoginComponent },
    { path: 'hello/neighbors/profile', component: ProfileComponent },
];

/*
Lazy loading des routes :
{
    path: 'products-list',
    loadComponent: () => import('./products-list/products-list.route')
},
*/