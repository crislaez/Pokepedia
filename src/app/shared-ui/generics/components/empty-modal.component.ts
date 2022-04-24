import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-modal',
  template:`
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-buttons class="text-color-dark" slot="end">
        <ion-button (click)="dismiss.next()"><ion-icon fill="clear" class="text-color-dark" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <app-no-data [title]="title" [image]="image" [top]="top"></app-no-data>
  </ion-content>
  `,
  styleUrls: ['./empty-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyModalComponent {

  @Input() top: string
  @Input() title: string
  @Input() image: string;
  @Output() dismiss = new EventEmitter<void>();


  constructor() { }



}
