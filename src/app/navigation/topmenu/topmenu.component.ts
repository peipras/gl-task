import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavigationService, NavMenu } from '../navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  navItems: any;
  isToggle = false;
  selectedIdtem = {};

  @Output() toggled = new EventEmitter<[boolean, boolean]>();
  private suscription: Subscription;

  constructor(
    private navigationService: NavigationService,

  ) {
    this.suscription = this.navigationService.curretMenuSubject$.subscribe((data) => {
      this.navItems = data.menu.filter(x => data.main.includes(x.id));
    });
  }

  ngOnInit() {
    this.navigationService.getMainMenu('./assets/data/menu.json').subscribe();
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
    this.navigationService.setSelectedMenu(item);

  }
}
