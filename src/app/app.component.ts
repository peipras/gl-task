import { Component } from '@angular/core';
import { navigationAnimation } from './navigation/animations';

@Component({
  selector: 'app-root',
  animations: [navigationAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isNavSideOn: boolean;
  isNavSubOn: boolean;

  title = 'gl-task';

  onToggled(isToggled: [boolean, boolean]) {
    this.isNavSideOn = isToggled[0];
    this.isNavSubOn = isToggled[1];
  }

  onClosed(isClose: [boolean, boolean]) {
    this.isNavSideOn = isClose[0];
    this.isNavSubOn = isClose[1];
  }
}
