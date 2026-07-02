import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {DataService} from '../../_services/data.service';
import {UserService} from '../../_services/user.service';
import {Channel} from 'src/app/_models/channel';
import {User} from 'src/app/_models/user';
import {Tag} from 'src/app/_models/tag';
import {ModalService} from '../../_services/modal.service';

@Component({
  selector: 'app-search-chennel',
  templateUrl: './search-chennel.component.html',
  styleUrls: ['./search-chennel.component.scss']
})
export class SearchChennelComponent implements OnInit {
  search_text = '';
  type_serch = 0;
  searchArr = [];
  categories = [];
  recommendedCh = [];
  constructor(public _location: Location,public dataService:DataService,public user:UserService,public mS:ModalService) { }

  ngOnInit() {

    this.dataService.send({
      method:'channels.recommended'
    }).then(data=>{

      this.recommendedCh = <Channel[]>data['data'];


    }).catch(data=>{

    });
    this.dataService.send({
      method:'channels.categories'
    }).then(data=>{
      this.dataService.categories = data['data'];
    }).catch(data=>{

    });
  }
  unsubscribe(type,id){
    var data = {
      method:null,
      session:this.user.profile.token,
    };
    switch (type) {
      case 'channels':
        data.method = 'channels.unsubscribe';
        data['channel_id'] = id;
        break;
      case 'tags':
        data.method = 'tags.unsubscribe';
        data['tag_id'] = id;
        break;
      case 'user':
        data.method = 'users.unsubscribe';
        data['user_id'] = id;
        break;
    }
    this.dataService.send(data).then(data=>{

    }).catch(data=>{

    });
  }
  subscribe(item){
    var data  = {
      name:item.name,
      img:item.img,
      id:item.id,
      is_mutual:item.icon?'0':1,
      // link:['/user-profile',this.user.id],
      // desc:this.help.timeOutGenerate(this.user.time),
      type:item.type
    }
    console.log(item,data);
    this.mS.subscribeModal.subscribe(data,item.icon=='0'?true:false,function(){
      item.icon = !item.icon
    }.bind(this))

  }

  search(){
    if (!this.search_text){return;}
    this.searchArr = [];
    if (this.type_serch==0){
      this.dataService.send({
        method:'search.all',
        session:this.user.profile.token,
        query:this.search_text
      }).then(data=>{
        this.searchArr = [];
        if (data['channels']){
          let arr = <Channel[]>data['channels']
          for (var i = 0; i < arr.length; i++) {

            this.searchArr.push({
              name:'~'+arr[i].name,
              count:arr[i].subscribers,
              img:arr[i].avatar,
              icon:arr[i].is_subscriber,
              id:arr[i].id,
              link:['/channel_viwe',arr[i].id],
              type:'channels'
            });
          }

        }
        if (data['tags']){
          let arr = <Tag[]>data['tags']
          for (var i = 0; i <arr.length; i++) {
            this.searchArr.push({
              name:'#'+arr[i].tag,
              count:arr[i].posts,
              img:arr[i].avatar,
              icon:arr[i].is_subscriber,
              id:arr[i].tag,
              link:['/tags_viwe',arr[i].tag],
              type:'tags'
            });
          }
        }


      }).catch(data=>{

      });
    }
    if (this.type_serch==1){
      this.dataService.send({
        method:'search.channel',
        session:this.user.profile.token,
        query:this.search_text
      }).then(data=>{
        this.searchArr = [];
        if (data['data']){

          let arr = <Channel[]>data['data']
          for (var i = 0; i < arr.length; i++) {
            this.searchArr.push({
              name:'~'+arr[i].name,
              count:arr[i].subscribers,
              img:arr[i].avatar,
              icon:arr[i].is_subscriber,
              id:arr[i].id,
              link:['/channel_viwe',arr[i].id],
              type:'channels'
            });
          }

        }


      }).catch(data=>{

      });
    }
    if (this.type_serch==2){
      this.dataService.send({
        session:this.user.profile.token,
        method:'search.tags',
        query:this.search_text
      }).then(data=>{
        this.searchArr = [];
          if (data['data']){
            let arr = <Tag[]>data['data']
            for (var i = 0; i < arr.length; i++) {
              this.searchArr.push({
                name:'#'+arr[i].tag,
                count:arr[i].posts,
                img:arr[i].avatar,
                icon:arr[i].is_subscriber,
                id:arr[i].tag,
                link:['/tags_viwe',arr[i].tag],
                type:'tags'
              });

            }

          }


      }).catch(data=>{

      });

    }
    if (this.type_serch==3){
      this.dataService.send({
        method:'search.user',
        session:this.user.profile.token,
        query:this.search_text
      }).then(data=>{
        this.searchArr = [];

        if (data['data']){
          let arr = <User[]>data['data']
          for (var i = 0; i < arr.length; i++) {
            this.searchArr.push({
              name:'@'+arr[i].username,
              count:1,
              img:arr[i].avatar,
              icon:arr[i].is_subscriber,
              id:arr[i].id,
              link:['/user-profile',arr[i].id],
              type:'user'
            });

          }

        }


      }).catch(data=>{

      });

    }

  }

}
