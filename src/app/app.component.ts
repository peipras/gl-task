import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('openClose', [
      state('open', style({
        visibility: 'visible',
        transform: 'translateX(0%)',
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
