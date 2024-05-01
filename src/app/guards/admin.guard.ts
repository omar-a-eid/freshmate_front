import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const router = new Router();

  if(authService.isAdmin()) {
    return true;
  } else {
    router.navigate(["/"]);
    return false;
  }
};
