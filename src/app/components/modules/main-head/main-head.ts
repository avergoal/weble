import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalService} from '../../../_services/modal.service';
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';
import {ModerateService} from 'src/app/_services/moderate.service';
import {AuthService} from '../../../_services/auth.service';
import {PostService} from '../../../_services/post.service';
declare var window;

@Component({
  selector: 'main-head',
  templateUrl: './main-head.html',
  styleUrls: ['./main-head.scss']
})
export class MainHeadComponent implements OnInit,OnDestroy {
  type = 0;

  constructor(private auth:AuthService, public router: Router,public mS:ModalService,public user:UserService,public dataService:DataService,public modS:ModerateService,public postService:PostService) {
    if (this.router.url=='/main'||this.router.url=='/join') {
      this.type = 0
    }
    else{
        this.type=1;
      }
  }
  clposts(){
    this.modS.activeModCh_id = null
    this.modS.modposts = []
  }

  getNotifyPosts(id){
    this.modS.activeModCh_id = id;
    this.dataService.send({
      method:'mod.posts.unconfirmed',
      session:this.user.profile.token,
      channel_id:this.modS.activeModCh_id
    }).then(data=>{
      if (data['data']){
        this.modS.modposts = data['data']
      }
    }).catch(err=>{})

  }
  getModPosts(){

    this.dataService.send({
      method:'mod.notifications',
      session:this.user.profile.token,

    }).then(data=>{
      if (data['data']){
        this.modS.notifyArr = data['data'];
      }


    }).catch(err=>{});

  }
  ngOnInit() {
    if (this.user.profile.is_moderator){
      this.getModPosts();
    }

  }
  ngOnDestroy() {
    // this.user.EVENT.filterTime.next();



  }

}

