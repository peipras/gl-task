import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavtopComponent } from './navtop/navtop.component';
import { NavsideComponent } from './navside/navside.component';
import { NavMenuService } from './nav-menu.service';
import { NavsubComponent } from './navsub/navsub.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavtopComponent, NavsideComponent, NavsubComponent],
  exports: [NavtopComponent, NavsideComponent, NavsubComponent],
  providers: [NavMenuService]

})
export class NavmenuModule { }
