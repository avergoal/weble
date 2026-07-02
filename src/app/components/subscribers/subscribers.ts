import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';
import {HelpersService} from '../../_services/helpers.service';
import {Router} from '@angular/router';
import {User} from 'src/app/_models/user';
import {Post} from '../../_models/post';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.html',
  styleUrls: ['./subscribers.scss']
})
export class SubscribersComponent implements OnInit {

  constructor(
    public router:Router,
    public _location: Location,

    public user:UserService,
    public dataService:DataService,

    public help:HelpersService) { }
  subscribers:User[] = [];
  uid;
  search_text;
  offset = -1
  skip = 0
  limit = 5
  cancel() {
    this._location.back();
  }
  ngOnInit() {

this.getSubscribe()
  }

  getSubscribe(){
    if (this.limit==0){return;}
    var d = this.router.getNavigatedData();
    let q = {
      method: 'users.subscribers',
      session: this.user.profile.token,
      offset:this.offset,
      skip:this.skip,
      limit:this.limit
    };
    if (typeof d =='object'){
      if (d.type&&d.type=='channel'){
        q['channel_id'] = d.id;
        q['method'] = 'channels.subscribers';
      }
      if (d.type&&d.type=='profile'){
        q['user_id'] = d.id;
        q['method'] = 'users.subscribers';
      }
    }
    this.dataService.send(q).then(data=>{
      // data['data'] ? this.subscribers = <User[]>data['data'] : null;
      if (data['data']&&(data['data']).length<this.limit){
        this.limit=0
      }
      if (data['offset']==-1){this.limit=0}
      this.offset = data['offset']
      if (!data['data']){return}
      this.skip+=this.limit
      this.subscribers = this.subscribers.concat(data['data'])

    }).catch(data=>{

    })
  }

}
