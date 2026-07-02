import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

declare let $: any;
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {
  @Output('event') event = new EventEmitter<any>();
  constructor() {

  }
  getNewPosts(){
    this.event.emit(true)
  }
  ngOnInit() {
  }


}
