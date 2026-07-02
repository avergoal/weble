import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {ModalService} from '../../_services/modal.service';
import {DataService} from '../../_services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../_models/post';
import {User} from '../../_models/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  _id
  profile:User

  posts:Post[] = []
  comments = []
  last_post = "0"
  skip = 0
  limit = 5
  activeTab = 'posts';
  constructor(private location: Location,public router:Router,private route: ActivatedRoute,public _location: Location,public user:UserService,public mS:ModalService,private dataService:DataService) {
    this.route.params.subscribe(params => {
      if (!this.user.auth){
        this.router.navigate(['/']);
        return
      }
      this._id = route.snapshot.params['id']
      if (this.user.profile.id==this._id){
        this.router.navigate(['/profile']);
        return
      }
      if (this._id!=undefined){
        this.dataService.send({
          method:'users.get',
          session:this.user.profile.token,
          user_id:this._id
        }).then(data=>{
          this.profile = <User>data

        }).catch(data=>{

        })
        this.getPost()

      }


    });
  }
  getPost(){

    if (this.limit==0){return;}
    this.dataService.send({
      method:'users.posts',
      session:this.user.profile.token,
      user_id:this._id,
      offset:this.last_post,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{
      if ((<Post[]>data['data']).length<this.limit){
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
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  subscribe(){

    this.mS.subscribeModal.subscribe({img:this.profile.avatar,name:this.profile.username,type:'user',id:this._id},this.profile.is_subscriber?false:true,function(){
      this.profile.is_subscriber = !this.profile.is_subscriber
      this.profile.is_subscriber?this.profile.subscribers++:this.profile.subscribers--

    }.bind(this))

  }
  ngOnInit() {

  }

}
