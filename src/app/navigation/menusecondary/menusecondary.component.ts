import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavigationService, NavMenu, NavSub } from '../navigation.service';


@Component({
  selector: 'app-menusecondary',
  templateUrl: './menusecondary.component.html',
  styleUrls: ['./menusecondary.component.scss']
})
export class MenuSecondaryComponent implements OnInit, OnDestroy {
  private suscription: Subscription;

  menuSubItems: NavSub[];
  menuSubHeader: string;

  constructor(private navigationService: NavigationService) {
    this.suscription = this.navigationService.selectedMenuId$.subscribe((item) => {
      this.menuSubItems = this.navigationService.getSubMenu(item.id);
      this.menuSubHeader = item.name;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
