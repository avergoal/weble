import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../_services/data.service";
import {AuthService} from "../../../_services/auth.service";
import {ModalService} from "../../../_services/modal.service";

@Component({
  selector: 'app-remind-reg',
  templateUrl: './auth-remind.component.html',
  styleUrls: ['./auth-remind.component.scss']
})
export class AuthRemindComponent implements OnInit {
  email
  pass
  username
  isSend = false
  constructor(private dataService:DataService,private authService:AuthService,private mS:ModalService) { }

  ngOnInit() {
  }

  remid(){
    if (!/\S+@\S+\.\S+/.test(this.email)){
      this.mS.error('введите почту')
      return
    }
    this.dataService.send({
      method: 'users.remind',
      email: this.email,

    }).then(data=>{
      this.isSend = true
    });
  }
}
