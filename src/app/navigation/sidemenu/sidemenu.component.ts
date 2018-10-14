import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';

import { NavigationService, NavMenu } from '../navigation.service';


@Component({
  selector: 'app-sidemenu',
  animations: [
    trigger('openClose', [
      state('open', style({
        visibility: 'visible',
        transform: 'translateX(0%)'
      })),
      state('closed', style({
        visibility: 'hidden',
        transform: 'translateX(-100%)',
      })),
      transition('open => closed', [
        animate('400ms'),
      ]
      ),
      transition('closed => open', [
        animate('400ms'),
      ]),
    ]),
  ],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private suscriptionState: Subscription;
  private istoggle = false;
  navItems: any;
  selectedItem = {};

  @Output() closed = new EventEmitter<[boolean, boolean]>();

  constructor(private navigationService: NavigationService) {
    this.subscription = this.navigationService.curretMenuSubject$.subscribe((data) => {
      this.navItems = data.menu.filter(x => data.main.includes(x.id));
    });

    this.suscriptionState = this.navigationService.menuStateubject$.subscribe((state) => {
      this.istoggle = state[0];
      if (state[2] !== null) {
        const isPrevActiveItem = this.selectedItem[state[2].id];
        this.selectedItem = {};
        this.selectedItem[state[2].id] = !isPrevActiveItem;
      }
      if (!state[1]) {
        this.selectedItem = {};
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.suscriptionState.unsubscribe();
  }
  toggleSubMenu(item: NavMenu) {
    const isPrevActiveItem = this.selectedItem[item.id];
    this.istoggle = !this.istoggle;
    this.navigationService.menuState = [true, true, item];
    this.navigationService.setSelectedMenu(item);
    this.selectedItem = {};
    this.selectedItem[item.id] = !isPrevActiveItem;
    this.closed.emit([true, this.selectedItem[item.id]]);

  }

  onClose() {
    this.closed.emit([false, false]);
    this.navigationService.menuState = [false, false, null];
    this.selectedItem = {};
  }
}
