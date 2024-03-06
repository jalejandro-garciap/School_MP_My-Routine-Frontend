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

  // https://fonts.google.com/icons ICONS
  public navItems:NavItem[] = [
    { title: 'Dashboard',         icon: 'donut_large',        url: AppRoutes.DASHBOARD },
    { title: 'Passenger',         icon: 'group',              url: AppRoutes.USERS },
    { title: 'Members',           icon: 'face',               url: AppRoutes.MEMBERS }
  ]

  constructor(private _authService:AuthService) {}

  onLogout():void {
    this._authService.logout();
  }

  get isAutenticate() {
    return this._authService.isAutenticate();
  }

}
