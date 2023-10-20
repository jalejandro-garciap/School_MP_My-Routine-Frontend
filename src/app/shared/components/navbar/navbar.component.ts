import { Component } from '@angular/core';
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

  public navItems:NavItem[] = [
    { title: 'Dashboard',         icon: 'donut_large',        url: AppRoutes.DASHBOARD},
    { title: 'Users',             icon: 'group',              url: AppRoutes.USERS},
    // { title: 'Excercie record',   icon: 'dashboard',          url: AppRoutes.DASHBOARD},
    { title: 'Exercie',           icon: 'fitness_center',     url: AppRoutes.MESSAGES}
  ]
}
