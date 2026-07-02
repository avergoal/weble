import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {DataService} from "../../_services/data.service";
import {ModalService} from '../../_services/modal.service';
import {Post} from '../../_models/post';
import {ModerateService} from '../../_services/moderate.service';
import {Router} from '@angular/router';
import {PostService} from '../../_services/post.service';

@Component({
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class MainComponent implements OnInit,OnDestroy {
  posts : Post[] = []
  skip = 0
  limit = 5
  last_post = "-1"
  eventSubscription
  constructor(
    private dataService:DataService,
    public user:UserService,
    public mS:ModalService,
    public modS:ModerateService,
    public router:Router,
    public postService:PostService) {



  }
   clearAll(){
     this.posts = []
     this.skip = 0;
     this.limit = 5;
     this.last_post = "-1";
     this.getPost();
     this.postService.mainPost = false
   }
   getPost(){
     console.log('scroll');
    if (this.limit==0){return;}
    this.dataService.send({
      method:'feed.main',
      session:this.user.profile.token,
      filter:this.mS.filterTimeModal.type,
      offset:this.last_post,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{
      if (!data['data']||data['data'].length<this.limit){
        this.limit=0

      }else{
        this.posts = this.posts.concat(data['data'])
      }
      this.skip+=this.limit

      if (this.posts.length>0){
        this.last_post = this.posts[this.posts.length-1].id
      }
    }).catch(data=>{

    })
  }
  ngOnInit() {
    this.eventSubscription = this.user.EVENT.filterTime.subscribe(d=>{
      this.posts = <Post[]>[]
      this.skip = 0
      this.limit = 5
      this.last_post = "-1"
      this.getPost()
    })
    if (this.user.profile.subscriptions==0){

      return
    }
    this.getPost()

  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

}
