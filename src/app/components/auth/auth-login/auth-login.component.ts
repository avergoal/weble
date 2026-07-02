import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../_services/data.service";
import {AuthService} from "../../../_services/auth.service";
import {ModalService} from "../../../_services/modal.service";
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  email
  pass
  constructor(private dataService:DataService,private authService:AuthService,public mS:ModalService,public user:UserService) { }

  ngOnInit() {
  }
  login(){
    if (!/\S+@\S+\.\S+/.test(this.email)){
      this.mS.error('enter e-mail')
      return
    }
    if (!this.pass||this.pass.length==0){
      this.mS.error('enter password')
      return
    }
    this.dataService.send({
      method: 'users.login',
      email: this.email,
      pass: this.pass
    }).then(data => {

      data.hasOwnProperty('session')?this.user.setUser(data['session'],function(){}):null;

    }).catch(data => {
      console.log();
    });
  }
}
