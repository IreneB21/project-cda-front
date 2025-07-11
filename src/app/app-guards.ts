import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service'

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated() || router.parseUrl("hello/neighbors/landing");
};

export const notAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return !authService.isAuthenticated() || router.parseUrl("hello/neighbors/profile/informations");
};

export const ownerGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const urlId = route.paramMap.get('id');
  const userId = sessionStorage.getItem("userId");
  return urlId !== userId || router.parseUrl("hello/neighbors/profile/informations");
}