import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavMenuService, NavMenu } from '../nav-menu.service';
import { NavsubComponent } from '../navsub/navsub.component';
import { getLocaleMonthNames } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.scss']
})
export class NavsideComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private previousItem: NavMenu = null;
  private istoggle = false;
  navItems: any;

  navsubComponent: NavsubComponent;

  @Output() closed = new EventEmitter<[boolean, boolean]>();

  constructor(private navMenuService: NavMenuService) {
    this.subscription = this.navMenuService.curretMenuSubject$.subscribe((data) => {
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
      this.navMenuService.setSelectedMenu(item);
    }
    this.previousItem = item;
  }

  onClose() {
    this.closed.emit([false, false]);
  }
}
