import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavigationService, NavMenu } from '../navigation.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
})
export class TopMenuComponent implements OnInit, OnDestroy {
  navItems: NavMenu[];
  isToggle = false;
  selectedItem = {};

  @Output() toggled = new EventEmitter<[boolean, boolean]>();
  private suscription: Subscription;
  private suscriptionState: Subscription;
  private subscriptionMainMenu : Subscription;

  constructor(private navigationService: NavigationService) {
    this.suscription = this.navigationService.curretMenuSubject$.subscribe((data) => {
      this.navItems = data.menu.filter(x => data.main.includes(x.id));
    });

    this.suscriptionState = this.navigationService.menuStateSubject$.subscribe((state) => {
      this.isToggle = state[0];
      if (state[2] !== null) {
        const isPrevActiveItem = this.selectedItem[state[2].id];
        this.changeState(state[2], isPrevActiveItem);
      }

      if (!state[1]) {
        this.selectedItem = {};
      }
    });
  }

  private changeState(item: NavMenu, state: boolean) {
    this.selectedItem = {};
    this.selectedItem[item.id] = !state;
  }

  ngOnInit() {
    this.subscriptionMainMenu = this.navigationService.getMainMenu().subscribe();
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
    this.suscriptionState.unsubscribe();
    this.subscriptionMainMenu.unsubscribe();
  }

  onToggle() {
    this.isToggle = !this.isToggle;
    this.toggled.emit([this.isToggle, false]);
    this.navigationService.menuState = [this.isToggle, false, null];
    this.selectedItem = {};
  }

  onClick(item: NavMenu) {
    const isPrevActiveItem = this.selectedItem[item.id];
    this.isToggle = true;
    this.navigationService.menuState = [true, true, item];
    this.changeState(item, isPrevActiveItem);
    this.navigationService.setSelectedMenu(item);
    this.toggled.emit([true, this.selectedItem[item.id]]);
  }
}
