import { inject } from "@angular/core";
import { 
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";

import { AuthService } from "../services/auth.service";
import { AppRoutes } from "src/app/routes.routing";

const isAutenticated = ():boolean => {
  const authService: AuthService = inject(AuthService);
  return authService.isAutenticate();
}

export const canMatchAuth: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router: Router = inject(Router);

  if( !isAutenticated() ) {
    router.navigate([AppRoutes.AUTH_LOGIN]);
    return false;
  }
  return true;
};

export const canMatchIsNotAutenticated: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  if( !isAutenticated() ) {
    return true;
  }
  return false;
};

export const canActivateAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => { 
  const router: Router = inject(Router);

  if( !isAutenticated() ) {
    router.navigate([AppRoutes.AUTH_LOGIN]);
    return false;
  }
  return true;
};
