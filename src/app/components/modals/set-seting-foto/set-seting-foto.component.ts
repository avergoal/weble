import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-set-seting-foto',
  templateUrl: './set-seting-foto.component.html',
  styleUrls: ['./set-seting-foto.component.scss']
})
export class SetSetingFotoComponent implements OnInit {
  @Input() img: any;
  @Output('cancel') cancel = new EventEmitter<any>();
  @Output('newImg') newImg = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
