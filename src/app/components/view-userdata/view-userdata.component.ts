import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {Location} from "@angular/common";
import {ModalService} from "../../_services/modal.service";
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-view-userdata',
  templateUrl: './view-userdata.component.html',
  styleUrls: ['./view-userdata.component.scss']
})
export class ViewUserdataComponent implements OnInit {
  typeFeed = 0
  constructor(public _location: Location,public user:UserService,public mS:ModalService,public dataService:DataService) { }

  ngOnInit() {
  }
  changeTCP(){
    this.dataService.TCP=!this.dataService.TCP
  }
  savensfw(e){

    this.user.profile.settings.nsfw = e.currentTarget.checked?'1':'0';
    let s = {
      method:'users.settings.main.save',
      session:this.user.profile.token,
      nsfw:e.currentTarget.checked?'1':'0'
    }
    this.dataService.send(s).then(data=>{

    }).catch(err=>{})
  }
  setLang(){
    this.mS.setLangModal.view = true
  }
}
