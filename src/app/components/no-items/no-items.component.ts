import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.component.html',
  styleUrls: ['./no-items.component.css']
})
export class NoItemsComponent {

  @Input() message?: string;

}
