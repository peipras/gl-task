import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavigationService, NavMenu } from '../navigation.service';
import { getLocaleMonthNames } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private suscriptionState: Subscription;
  private istoggle = false;
  private prevActiveItem = false;
  navItems: any;
  selectedItem = {};

  @Output() closed = new EventEmitter<[boolean, boolean]>();

  constructor(private navigationService: NavigationService) {
    this.subscription = this.navigationService.curretMenuSubject$.subscribe((data) => {
      this.navItems = data.menu.filter(x => data.main.includes(x.id));
    });

    this.suscriptionState = this.navigationService.menuStateubject$.subscribe((state)=>
    {
      this.istoggle = state[0];
      if(state[2]!== null){
        this.prevActiveItem = this.selectedItem[state[2].id];
        this.selectedItem = {};
        this.selectedItem[state[2].id] = !this.prevActiveItem;
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
    this.prevActiveItem = this.selectedItem[item.id];
    this.istoggle = !this.istoggle;
    this.navigationService.setSelectedMenu(item);
    this.selectedItem = {};
    this.selectedItem[item.id] = !this.prevActiveItem;
    this.closed.emit([true, this.selectedItem[item.id]]);
  }

  onClose() {
    this.closed.emit([false, false]);
    this.selectedItem = {};
    this.prevActiveItem = false;
    this.navigationService.menuState = [false, false, null];
  }
}
