import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-hash-tags',
  templateUrl: './create-hash-tags.component.html',
  styleUrls: ['./create-hash-tags.component.scss']
})
export class CreateHashTagsComponent implements OnInit {
  hashtags = ''
  @Input() tags: string[] = [];
  @Output() tagsArr: any =  new EventEmitter<boolean>()
  @Output('close') close = new EventEmitter<boolean>()
  constructor() { }
  ngOnChanges(changes: any) {
    if (changes.close){
      this.ngOnInit()
    }
  }
  ngOnInit() {
    this.hashtags = this.tags.join(' ')

  }
  genHash(){
    let y = this.hashtags.split(' ')
    for (var i = 0; i < y.length; i++) {
      y[i]=' #'+y[i].toString().trim();
      if (y[i]=='#'){y.splice(i,1)}

    }

    this.hashtags = y.join(' ')
  }
  acceptHash(){


    if (this.hashtags.split(' ').length>=6){
      this.setHashTags()
    }
  }
  setHashTags(){
    var t = this.hashtags.split(' ')
    this.tagsArr.emit(t)
    this.close.emit()
  }
}
