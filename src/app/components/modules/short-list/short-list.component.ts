import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';
import {HelpersService} from '../../../_services/helpers.service';
import {AuthService} from '../../../_services/auth.service';
import {ModalService} from '../../../_services/modal.service';
import {Channel} from '../../../_models/channel';
import {User} from '../../../_models/user';
import {Tag} from '../../../_models/tag';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-short-list',
  templateUrl: './short-list.component.html',
  styleUrls: ['./short-list.component.scss']
})
export class ShortListComponent implements OnInit {
  @Input() user: User;
  @Input() channels:Channel;
  @Input() hashtags:Tag;
  @Input() filter: any;

  item = {};
  constructor(

    public  translate: TranslateService,
    public _location: Location,
    public uS:UserService,
    private dataService:DataService,
    public help:HelpersService,
    public mS:ModalService
  ) { }
  ngOnChanges(changes: any) {
    if (changes.filter){
      this.ngOnInit();
    }

  }
  setSubscr(user){
    if (user.hasOwnProperty('is_mutual')){
      if (user.is_mutual=='1'){return true;}
      if (user.is_mutual!='1'){return false;}
    }
    if (user.hasOwnProperty('is_subscriber')){
      if (user.is_subscriber==true){return true;}
      if (user.is_subscriber!=true){return false;}
    }
  }
  async ngOnInit() {
    var item = null;
    if (this.user){

      item = {
        name:'@'+this.user.username,
        img:this.user.avatar,
        id:this.user.id,
        is_subscriber:this.setSubscr(this.user),
        link:['/user-profile',this.user.id],
        desc:this.help.timeOutGenerate(this.user.created_at),
        set0:this.subscribe.bind(this),
        set1:this.unsubscribe.bind(this),
        type:'user'
      };
    }
    if (this.channels){

      item = {
        name:'~'+this.channels.name,
        img:this.channels.avatar,
        id:this.channels.id,
        is_subscriber:this.channels.is_subscriber,
        link:['/channel_viwe',this.channels.id],
        // desc:this.help.timeOutGenerate(this.user.time)+' назад',
        desc:(this.channels.subscribers||0)+' '+ this.translate.get(this.dataService.declination(this.channels.subscribers,'subscriber'))['value'],
        set0:this.subscribe.bind(this),
        set1:this.unsubscribe.bind(this),
        type:'channels'
      };
    }


    if (item&&this.filter&&this.filter.text){

      if ((item.name.toLowerCase()+'').indexOf(this.filter.text.toLowerCase()+'')+1>0) {
        this.item = item;

      }else{
        this.item = null;

      }

    }else{
      this.item = item;
    }


  }
  subscribe(data){

    this.mS.subscribeModal.subscribe(data,true,function(){
      this.item.is_subscriber = true;
      switch (data.type) {
        case 'user':
          // this.item.is_subscriber = true

          break;
        case 'channels':
          // this.channels.is_subscriber= true
          break;
      }


      // this.ngOnInit()
    }.bind(this));
  }
  unsubscribe(data){
    this.mS.subscribeModal.subscribe(data,false,function(){
      this.item.is_subscriber = false;

      switch (data.type) {
        case 'user':

          break;
        case 'channels':

          break;
      }

    }.bind(this));

  }

}
