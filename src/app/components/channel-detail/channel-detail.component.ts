import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {ModalService} from '../../_services/modal.service';
import {DataService} from '../../_services/data.service';
import {Channel} from '../../_models/channel';
import {Post} from '../../_models/post';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss']
})
export class ChannelDetailComponent implements OnInit {
  menu = false
  _id
  channel:Channel
  posts:Post[] = []
  modposts:Post[] = []
  togl = 0
  modal = 0
  last_post = -1
  skip = 0
  limit = 5
  uploadAvatar = false
  constructor(public router:Router,private route: ActivatedRoute,public _location: Location,public user:UserService,public mS:ModalService,private dataService:DataService) {
    this.route.params.subscribe(params => {
      this._id = route.snapshot.params['id']
    })
  }
  setModHide(){
    this.menu = false
  }
  setFile(e){

    this.channel.avatar = e
    this.dataService.send({
      method:'channels.update',
      session:this.user.profile.token,
      channel_id:this._id,
      attachment:e
    }).then(data=>{

    }).catch(err=>{})
    // this.attachment = e
  }
  getModPosts(){

    this.dataService.send({
      method:'mod.posts.unconfirmed',
      session:this.user.profile.token,
      channel_id:this._id
    }).then(data=>{
      this.modposts = data['data']

    }).catch(err=>{})
  }
  getPost(){
    if (this.limit==0){return;}
    this.dataService.send({
      method:'channels.posts',
      session:this.user.profile.token,
      channel_id:this._id,
      offset:this.last_post,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{

      if (data['data']&&(<Post[]>data['data']).length<this.limit){
        this.limit=0
      }
      if (!data['data']){return}
      this.skip+=this.limit
      this.posts = this.posts.concat(data['data'])
      if (this.posts.length>0){
        this.last_post = parseInt(this.posts[this.posts.length-1].id)
      }
    }).catch(data=>{
      console.log('ERR',data)
    })
  }
  subscribe(){

    this.mS.subscribeModal.subscribe({img:this.channel.avatar,name:this.channel.name,type:'channels',id:this._id},this.channel.is_subscriber?false:true,function(){

      this.channel.is_subscriber = !this.channel.is_subscriber
      this.channel.is_subscriber?this.channel.subscribers++:this.channel.subscribers--

    }.bind(this))

    var m = this.channel.is_subscriber?'unsubscribe':'subscribe'

  }

  ngOnInit() {


    this.dataService.send({
      method:'channels.get',
      session:this.user.profile.token,
      channel_id:this._id
    }).then(data=>{
      this.channel = <Channel>data
      if (this.channel.is_moderator){
        this.getModPosts()
      }
    }).catch(err=>{})
    this.getPost()

  }

}
