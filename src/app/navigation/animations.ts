import { trigger, state, style, animate, transition, animation } from '@angular/animations';

export const navigationAnimation =
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
  ]);
