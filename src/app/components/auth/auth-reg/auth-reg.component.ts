import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../_services/data.service";
import {AuthService} from "../../../_services/auth.service";
import {ModalService} from "../../../_services/modal.service";
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-auth-reg',
  templateUrl: './auth-reg.component.html',
  styleUrls: ['./auth-reg.component.scss']
})
export class AuthRegComponent implements OnInit {
  email
  pass
  username
  errorPass = false
  constructor(private dataService:DataService,private authService:AuthService,private mS:ModalService,public user:UserService) { }

  ngOnInit() {
  }
  isValidPass(){
    this.errorPass =  /[^A-Z-a-z-0-9]/g.test(this.pass)

  }
  reg(){

    if (!/\S+@\S+\.\S+/.test(this.email)){
      this.mS.error('введите почту')
      return
    }
    if (!this.username||this.username.length==0){
      this.mS.error('введите имя')
      return
    }
    if (!this.pass||this.pass.length==0){
      this.mS.error('введите пароль')
      return
    }
    this.dataService.ws.io.disconnect()
    this.dataService.ws.io.connect()
    this.dataService.send({
      method:'users.reg',
      email:this.email,
      username:this.username,
      pass:this.pass
    }).then(data => {
      data.hasOwnProperty('session')?this.user.setUser(data['session'],function(){}):null;
    }).catch(data => {
      console.log();
    });
  }
}
