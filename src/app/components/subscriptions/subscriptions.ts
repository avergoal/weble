import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';
import {HelpersService} from '../../_services/helpers.service';
import {Router} from '@angular/router';
import {Channel} from '../../_models/channel';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.html',
  styleUrls: ['./subscriptions.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions = []
  channels:Channel[] = []
  hashtags = []
  tabs = 0
  filterText = ''
  uid
  offset = -1
  skip = 0
  limit = 5
  constructor(public router:Router,public _location: Location,public user:UserService,public dataService:DataService,public help:HelpersService) { }
  cancel() {
    this._location.back();
  }
  clearData(){
    this.subscriptions = []
    this.channels = []
    this.offset = -1
    this.skip = 0
    this.limit = 5
    this.getSubscribtions()
  }
  ngOnInit() {
    this.getSubscribtions()

  }
  getSubscribtions(){
    let m = ''
    if (this.tabs==0){m = 'users.subscriptions'}
    if (this.tabs==1){m = 'users.channels'}
    if (this.limit==0){return;}
    var d = this.router.getNavigatedData()

    let q = {
      method: m,
      session: this.user.profile.token,
      offset:this.offset
    }
    console.log(typeof d);
    console.log(d);
    if (typeof d =='string'){
      this.uid = d

    }
    if (this.uid){
      q['user_id'] = this.uid
    }
    this.dataService.send(q).then(data=>{
      // data['data'] ? this.subscribers = <User[]>data['data'] : null;
      if (data['data']&&(data['data']).length<this.limit){
        this.limit=0
      }

      if (data['offset']==undefined){data['offset'] = -1}
      if (data['offset']==-1){this.limit=0}
      if (data['offset']){this.offset = data['offset']}


      if (!data['data']){return}
      this.skip+=this.limit

      if (this.tabs==0){this.subscriptions = this.subscriptions.concat(data['data'])}
      if (this.tabs==1){this.channels = this.channels.concat(data['data'])}


    }).catch(data=>{

    })
  }

}
