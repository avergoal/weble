import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../_services/user.service";
import {DataService} from "../../../_services/data.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(private dataService:DataService,public user:UserService) { }
    posts = []
  ngOnInit() {

      this.dataService.send({
          method:'feed.main',
          session:this.user.profile.token,
          last:0
      }).then(data=>{

      }).catch(data=>{

      })
  }

}
