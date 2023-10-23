import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppRoutes } from 'src/app/routes.routing';

export interface NavItem {
  title:  string;
  icon:   string;
  url:    string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public logoRoute = AppRoutes.USERS;

  public navItems:NavItem[] = [
    { title: 'Dashboard',         icon: 'donut_large',        url: AppRoutes.DASHBOARD},
    { title: 'Users',             icon: 'group',              url: AppRoutes.USERS}
  ]

  constructor(private _authService:AuthService) {}

  onLogout():void {
    this._authService.logout();
  }

  get isAutenticate() {
    return this._authService.isAutenticate();
  }

}
