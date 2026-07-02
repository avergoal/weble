import { Component, OnInit } from '@angular/core';
import {Channel} from '../../_models/channel';
import {Post} from '../../_models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {ModalService} from '../../_services/modal.service';
import {DataService} from '../../_services/data.service';
import {Tag} from '../../_models/tag';

@Component({
  selector: 'app-tags-viwe',
  templateUrl: './tags-viwe.component.html',
  styleUrls: ['./tags-viwe.component.scss']
})
export class TagsViweComponent implements OnInit {

  _id
  tag:Tag
  modal = 0
  togl = 0
  posts : Post[] = []
  skip = 0
  limit = 5
  last_post = "-1"
  constructor(public router:Router,private route: ActivatedRoute,public _location: Location,public user:UserService,public mS:ModalService,private dataService:DataService) {
    this.route.params.subscribe(params => {

      this._id = route.snapshot.params['id']
    })
  }

  ngOnInit() {

    this.getPost()

 }
  updatePost(){
    console.log('updatePost');
    this.limit = 5
    this.posts = []
    this.last_post = "-1"
    this.getPost();
  }
  getPost(){
    if (this.limit==0){return;}
    this.dataService.send({
      method:'search.bytag',
      session:this.user.profile.token,
      tag:this._id,
      ...{top:this.togl === 0 ? true : null},
      offset:this.last_post,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{


      if (!data['data']||data['data'].length<this.limit){
        this.limit=0
      }

      this.skip+=this.limit

      this.posts = this.posts.concat(data['data'])

      if (this.posts.length>0){
        this.last_post = this.posts[this.posts.length-1].id
      }

    }).catch(data=>{

    })
  }

}
