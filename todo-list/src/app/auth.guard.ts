import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DateService } from './services/date.service';

export const mainGuard: CanActivateFn = (route, state) => {
  return inject(DateService).canActivate();

};

export const authGuard: CanActivateFn = (route, state) => {
  return inject(DateService).canActivateAuth();
};