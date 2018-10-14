import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopMenuComponent } from './topmenu/topmenu.component';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { NavigationService } from './navigation.service';
import { MenuSecondaryComponent } from './menusecondary/menusecondary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TopMenuComponent, SideMenuComponent, MenuSecondaryComponent],
  exports: [TopMenuComponent, SideMenuComponent, MenuSecondaryComponent],
  providers: [NavigationService]

})
export class NavigationModule { }
