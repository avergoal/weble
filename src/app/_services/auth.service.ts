import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

import {DataService} from "./data.service";
import {Router} from "@angular/router";
import {User} from '../_models/user';
import {ModerateService} from './moderate.service';


import {
  AuthService as Auth2,
  FacebookLoginProvider,
  GoogleLoginProvider,
  VkontakteLoginProvider
} from 'angular-6-social-login-v2';

import {ModalService} from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public auth = false
  // public loading = true
  username = ''
  error = false
  token = ''
  constructor(public mS:ModalService,private socialAuthService: Auth2,public modS:ModerateService,private user:UserService,private dataService:DataService, public router: Router) {

    var token = localStorage.getItem("token");

    if (token){
      this.user.setUser(token,function(){})

    }else{

      this.router.navigate(['/']);
      this.user.loading = false

    }


  }
  setSession(data){
    this.user.setUser(data['session'],res=>{

    });
  }
    setCookie(token,data = null) {
      this.user.profile = data
        this.user.setUser(token,res=>{

            this.router.navigate(['/main-popular']);
        });


    }
    checkToken(){
        // return this.auth
    }
    logOut(){
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      this.dataService.ws.io.disconnect()
      this.dataService.ws.io.connect()
      this.modS.modposts = []
      this.modS.notifyArr = []
      this.modS.activeModCh_id = null
      this.user.profile = <User>{
        settings:{
          lang:'en'
        }
      }
      this.user.auth = false
      this.router.navigate(['/main']);
    }
  LoginWithFacebook(){
    let socialPlatformProvider;

      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;



    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {


    this.token = userData['token']
        this.dataService.send({
          method:'users.auth.facebook',
          token:userData['token'],
        }).then(data=>{

          if (data.hasOwnProperty('data')&&data['data'].hasOwnProperty('need_username')){
            this.mS.createUsernameModal.view = true
          }

          if (data.hasOwnProperty('session')){
            this.user.setUser(data['session'],function(){})
            this.mS.createUsernameModal.view = false
          }else{
            //this.error=true;
          }


        }).catch(data=>{

          console.log('ERR',data);
        });

      }
    );

  }
}
