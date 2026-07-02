import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';
import {HelpersService} from '../../_services/helpers.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss']
})
export class CreateGroupChatComponent implements OnInit {
  newDialog
  subscribers = []

  constructor(public _location: Location,public user:UserService,public dataService:DataService,public help:HelpersService) { }

  ngOnInit() {
    this.dataService.send({
      method:'users.subscribers',
      session:this.user.profile.token,
      offset:-1
    }).then(data=>{
      this.subscribers = data['data']

    }).catch(data=>{

    })
  }
  sendMessage(){

  }
  setNewDialog(){


  }

}
