import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavigationService, NavMenu } from '../navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menusecondary',
  templateUrl: './menusecondary.component.html',
  styleUrls: ['./menusecondary.component.scss']
})
export class MenuSecondaryComponent implements OnInit, OnDestroy {
  navItems: any;
  headerItem: string;
  isToggle: boolean;
  private suscription: Subscription;

  constructor(private NavigationService: NavigationService) {
    this.suscription = this.NavigationService.selectedMenuId$.subscribe((item) => {
      this.loadSubmenu(item);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  loadSubmenu(item: NavMenu) {
    this.navItems = this.NavigationService.getSubMenu(item.id);
    this.headerItem = item.name;
  }
}
