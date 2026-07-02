import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {ModalService} from '../../_services/modal.service';
import {DataService} from '../../_services/data.service';
import {Channel} from '../../_models/channel';

@Component({
  selector: 'app-channels-category',
  templateUrl: './channels-category.component.html',
  styleUrls: ['./channels-category.component.scss']
})
export class ChannelsCategoryComponent implements OnInit {
  category
  channels:Channel[] = []
  constructor(public router:Router,private route: ActivatedRoute,public _location: Location,public user:UserService,public mS:ModalService,private dataService:DataService) {
    this.route.params.subscribe(params => {
      for (var i = 0; i < this.dataService.categories.length; i++) {
        if (this.dataService.categories[i].cat_id==route.snapshot.params['id']){
          this.category = this.dataService.categories[i]
        }
      }

    })
  }
  subscribe(ch:Channel){

    var data  = {
      name:'@'+ch.name,
      img:ch.avatar,
      id:ch.id,
      is_mutual:ch.is_subscriber?'0':1,
      type:'channels'
    }
    this.mS.subscribeModal.subscribe(data,!ch.is_subscriber,function(){
      ch.is_subscriber = !ch.is_subscriber
    }.bind(this))

  }
  ngOnInit() {
    this.dataService.send({
      method:'search.bycategory',
      session:this.user.profile.token,
      category:this.category.cat_id
    }).then(data=>{
    this.channels = data['data']

    }).catch(data=>{

    })
  }

}
