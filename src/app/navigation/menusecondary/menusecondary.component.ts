import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavigationService, NavSub } from '../navigation.service';


@Component({
  selector: 'app-menusecondary',
  templateUrl: './menusecondary.component.html',
  styleUrls: ['./menusecondary.component.scss']
})
export class MenuSecondaryComponent implements OnDestroy {
  private suscription: Subscription;

  menuSubItems: NavSub[];
  menuSubHeader: string;

  constructor(private navigationService: NavigationService) {
    this.suscription = this.navigationService.selectedMenuId$.subscribe((item) => {
      this.menuSubItems = this.navigationService.getSubMenu(item.id);
      this.menuSubHeader = item.name;
    });
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
