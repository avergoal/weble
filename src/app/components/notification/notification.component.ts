import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  togl = 0
  likes = 1
  comments = 1
  subscribers = 1
  incomsubnotify = 1
  newmessnotify = 1
  marketingnotify = 1
  mail_1 = true
  mail_2 = true
  mail_3 = true
  constructor(public _location: Location,private user:UserService,private dataService:DataService) { }

  ngOnInit() {
  }
  save(){
    let q = {session:this.user.profile.token}
    if (this.togl==0){
      q['method'] = 'users.settings.push'
      q['likes'] = this.likes
      q['comments'] = this.comments
      q['subscribers'] = this.subscribers
      q['incomsubnotify'] = this.incomsubnotify
      q['newmessnotify'] = this.newmessnotify
      q['marketingnotify'] = this.marketingnotify
    }
    if (this.togl==1){
      q['method'] = 'users.settings.mail.save'
      q['feedback'] = this.mail_1
      q['reminder'] = this.mail_2
      q['news'] = this.mail_3

    }
    this.dataService.send(q).then(data=>{});

  }
}
