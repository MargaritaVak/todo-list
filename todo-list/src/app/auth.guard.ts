import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DateService } from './services/date.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(DateService).canActivateAuth();
};
