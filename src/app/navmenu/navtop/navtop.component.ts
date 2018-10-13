import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavMenuService, NavMenu } from '../nav-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navtop',
  templateUrl: './navtop.component.html',
  styleUrls: ['./navtop.component.scss']
})
export class NavtopComponent implements OnInit, OnDestroy {
  navItems: any;
  isToggle = false;
  selectedIdtem = {};

  @Output() toggled = new EventEmitter<[boolean, boolean]>();
  private suscription: Subscription;

  constructor(
    private navMenuService: NavMenuService,

  ) {
    this.suscription = this.navMenuService.curretMenuSubject$.subscribe((data) => {
      this.navItems = data.menu.filter(x => data.main.includes(x.id));
    });
  }

  ngOnInit() {
    this.navMenuService.getMainMenu('./assets/data/menu.json').subscribe();
  }

  ngOnDestroy (): void {
    this.suscription.unsubscribe();
  }

  onToggle() {
    this.isToggle = !this.isToggle;
    this.toggled.emit([this.isToggle, false]);
  }

  onClick(item: NavMenu) {
    this.isToggle = true;
    this.toggled.emit([true, true]);
    this.selectedIdtem = {};
    this.selectedIdtem[item.id] = true;
    this.navMenuService.setSelectedMenu(item);

  }
}
