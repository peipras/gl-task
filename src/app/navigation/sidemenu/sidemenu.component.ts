import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavigationService, NavMenu } from '../navigation.service';
import { getLocaleMonthNames } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private previousItem: NavMenu = null;
  private istoggle = false;
  navItems: any;

  @Output() closed = new EventEmitter<[boolean, boolean]>();

  constructor(private navigationService: NavigationService) {
    this.subscription = this.navigationService.curretMenuSubject$.subscribe((data) => {
      this.navItems = data.menu.filter(x => data.main.includes(x.id));
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleSubMenu(item: NavMenu) {
    this.istoggle = !this.istoggle;

    if ((this.previousItem !== null) && (this.previousItem.id === item.id)) {
        this.closed.emit([true, this.istoggle]);
    } else {
      this.closed.emit([true, true]);
      this.navigationService.setSelectedMenu(item);
    }
    this.previousItem = item;
  }

  onClose() {
    this.closed.emit([false, false]);
  }
}
