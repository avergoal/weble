import {EventEmitter, Injectable} from '@angular/core';

import {DataService} from './data.service';
import {User} from '../_models/user';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from './auth.service';
import {ModalService} from './modal.service';
import {TranslateService} from '@ngx-translate/core';
import {ModerateService} from './moderate.service';
import {MessageService} from './message.service';

declare var EXIF;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public profile = <User>{
      settings:{
        lang:'en'
      }
    };
    auth = false;
    loading = true;
  activTab = 2;
  lang = 'en';
    EVENT = {
      filterTime: new EventEmitter<any>()
    };

    constructor(
      public _location: Location,

      private dataService: DataService,
      public router: Router,
      public route:ActivatedRoute,
      private mS:ModalService,
      private translate: TranslateService,
      private modS:ModerateService
      ) {

    }

    setUser(token, callback) {

      this.modS.modposts = [];
      this.modS.notifyArr = [];
      this.modS.activeModCh_id = null;
      this.dataService.ws.io.disconnect()
      this.dataService.ws.io.connect()
      this.dataService.USERS = {}
      this.dataService.send({
        method:'users.auth',
        session: token,
        device:this.dataService.device
      }).then(data=>{

        this.profile =  <User>data;
        if (this.profile.pm<0){this.profile.pm = 0}




        if (this.profile.settings){
          if (this.profile.settings.hasOwnProperty('feed')){
            switch (this.profile.settings.feed) {
              case '0':
                this.mS.viewPostType.type='';
                break;
              case '1':
                this.mS.viewPostType.type='miniature';
                break;
              case '2':
                this.mS.viewPostType.type='text-view';
                break;
            }
          }


          if (this.profile.settings.hasOwnProperty('lang')){
            this.translate.use(this.profile.settings.lang);
          }else{

          }
          if (this.profile.settings.hasOwnProperty('nsfw')){


          }

        }else{


            this.profile.settings = {
                lang:this.lang,
                feed:'0',
                nsfw:'0'
            };

          console.log('USE LANG',this.lang);
        }

        this.profile.token = token;
        this.auth = true;
        this.loading = false;
        var profiles = JSON.parse(localStorage.getItem('profile'));


        if (profiles){
          var set = false;
          for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].id==this.profile.id){
              profiles[i] = this.profile;
              set = true;
            }
          }
          if (!set){
            profiles.push(this.profile);
          }
          console.log(set);
        }else{
          profiles = [this.profile];
        }

        localStorage.setItem('profile',JSON.stringify(profiles));
        localStorage.setItem('token',token);


        let u = window.location.pathname.split('/');

        if (u.length==2){

          if (this.profile.subscriptions==0){
            this.router.navigate(['/search_chennel']);
          }else{
            this.router.navigate(['/main-popular']);
          }
        }


        callback(true);


      }).catch(data=>{
        this.router.navigate(['/login']);

      });

      this.dataService.send({
        method:'channels.categories',

      }).then(data=>{
        this.dataService.categories = data['data'];

      }).catch(data=>{

      });


    }

    editUserData(data) {

        let req = Object.assign({
            method: 'users.profile.save',
            session: this.profile.token
        }, data);
        this.dataService.send(req).then(res => {
            this.profile = Object.assign(this.profile, data);
        }).catch(data => {
        });
    }
}
