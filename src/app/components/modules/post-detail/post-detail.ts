import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../_services/data.service";
import {UserService} from "../../../_services/user.service";
import {Post} from '../../../_models/post';
import { Location } from '@angular/common';

declare var navigator;

@Component({
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.scss']
})
export class PostDetailComponent implements OnInit {
    _id
    post:Post
  constructor(public _location: Location,private route: ActivatedRoute,private dataService:DataService,private user:UserService) {

  }
back(){

      if (window.history.length>2){
        this._location.back()
      }else{
        navigator.app.exitApp();
      }

}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this._id = this.route.snapshot.params['id']
      if (this._id!=undefined){

        this.dataService.send({
          method:'posts.get',
          session:this.user.profile.token,
          post_id:this._id
        }).then(data=>{
          this.post = <Post>data['data']

        })
      }


    });
  }

}
