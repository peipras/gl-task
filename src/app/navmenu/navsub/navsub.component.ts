import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavMenuService, NavMenu } from '../nav-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navsub',
  templateUrl: './navsub.component.html',
  styleUrls: ['./navsub.component.scss']
})
export class NavsubComponent implements OnInit, OnDestroy {
  navItems: any;
  headerItem: string;
  isToggle: boolean;
  private suscription: Subscription;

  constructor(private navmenuService: NavMenuService) {
    this.suscription = this.navmenuService.selectedMenuId$.subscribe((item) => {
      this.loadSubmenu(item);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  loadSubmenu(item: NavMenu) {
    this.navItems = this.navmenuService.getSubMenu(item.id);
    this.headerItem = item.name;
  }
}
