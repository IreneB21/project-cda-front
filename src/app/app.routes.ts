import { Routes } from '@angular/router';
import { SignupComponent } from './components/member/signup/signup.component';
import { LoginComponent } from './components/shared/login/login.component';
import { LandingComponent } from './components/shared/landing/landing.component';
import { ProfileComponent } from './components/member/profile/profile.component';

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