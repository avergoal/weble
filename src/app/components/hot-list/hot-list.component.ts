import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../_services/data.service";
import {UserService} from "../../_services/user.service";
import {ModalService} from '../../_services/modal.service';
import {ModerateService} from '../../_services/moderate.service';

import {Post} from '../../_models/post';
import {PostService} from '../../_services/post.service';

@Component({
  selector: 'app-hot-list',
  templateUrl: './hot-list.component.html',
  styleUrls: ['./hot-list.component.scss']
})
export class HotListComponent implements OnInit,OnDestroy {
  selector: string = '.main-panel';
  posts : Post[] = []
  skip = 0
  limit = 5
  last_post = "-1"
  eventSubscription
  constructor(private dataService:DataService,public user:UserService,public mS:ModalService,public modS:ModerateService,public postService:PostService) {

    // this.user.EVENT.filterTime.next(true)
    // this.user.EVENT.filterTime.complete()
  }
  clearAll(){
    this.posts = []
    this.skip = 0;
    this.limit = 5;
    this.last_post = "-1";
    this.getPosts();
    this.postService.hotListPost = false
  }
  getPosts(){
    if (this.limit==0){return;}
    console.log('GETPOST');
    this.dataService.send({
      method:'feed.popular',
      session:this.user.profile.token,
      filter:this.mS.filterTimeModal.type,
      offset:this.last_post,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{
      console.log("eed.popular",data);
      if (!data['data']||data['data'].length<this.limit){
        this.limit=0

      }
      if (data['offset']==-1){this.limit=0}
      this.last_post = data['offset']

      this.skip+=this.limit
      if (!data['data']){return}
      this.posts = this.posts.concat(data['data'])


    }).catch(data=>{

    })
  }
  ngOnInit() {
    console.log('INIT SUBSCRIPT',this.user.EVENT.filterTime);
    this.eventSubscription = this.user.EVENT.filterTime.subscribe(d=>{
      console.log('SUBSCRRRR');
      this.posts = <Post[]>[]
      this.skip = 0
      this.limit = 5
      this.last_post = "-1"
      this.getPosts()
    })
     this.getPosts()
  }
  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

}
