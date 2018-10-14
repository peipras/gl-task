import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavigationService, NavMenu } from '../navigation.service';
import { navigationAnimation } from '../animations';


@Component({
  selector: 'app-sidemenu',
  animations: [navigationAnimation],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private suscriptionState: Subscription;
  isMenuItemToggle = false;
  menuItems: any;
  selectedItem = {};

  @Output() closed = new EventEmitter<[boolean, boolean]>();

  constructor(private navigationService: NavigationService) {
    this.subscription = this.navigationService.curretMenuSubject$.subscribe((data) => {
      this.menuItems = data.menu.filter(x => data.main.includes(x.id));
    });

    this.suscriptionState = this.navigationService.menuStateubject$.subscribe((state) => {
      this.isMenuItemToggle = state[0];
      if (state[2] !== null) {
        const isPrevActiveItem = this.selectedItem[state[2].id];

        this.changeState(state[2], isPrevActiveItem);

      }
      if (!state[1]) {
        this.selectedItem = {};
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.suscriptionState.unsubscribe();
  }

  private changeState(item: NavMenu, state: boolean) {
    this.selectedItem = {};
    this.selectedItem[item.id] = !state;
  }

  toggleSubMenu(item: NavMenu) {
    const isPrevActiveItem = this.selectedItem[item.id];

    this.isMenuItemToggle = !this.isMenuItemToggle;
    this.navigationService.menuState = [true, true, item];
    this.navigationService.setSelectedMenu(item);

    this.changeState(item, isPrevActiveItem);
    this.closed.emit([true, this.selectedItem[item.id]]);
  }

  onClose() {
    this.closed.emit([false, false]);
    this.navigationService.menuState = [false, false, null];
    this.selectedItem = {};
  }
}
