import {Component, OnInit} from '@angular/core';
import {DataService} from './_services/data.service';
import {AuthService} from './_services/auth.service';
import {ModalService} from './_services/modal.service';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {UserService} from './_services/user.service';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
    title = 'webleNew';
    isLogin = false;
    spiner = false;
    Flogin = true;
    Freg = false;
    Fremind = false;
    email = 'severomorets@mail.ru';
    username = '123456';
    pass = '123456';
    href = window.location.href;

    cutDescription(description) {
        if (description.length > 100) {
            return description.slice(0, 100);
        }
        return description;
    }

    constructor(public dataService: DataService,public authService:AuthService,public mS:ModalService,private router:Router,public user:UserService,private translate: TranslateService) {
        this.isLogin = user.auth;
      router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
          if (this.dataService.HISTORY.history[0]!=event.url){
            this.dataService.HISTORY.history.unshift(event.url);
          }
        }

      });

    }

    ngOnInit() {

      this.translate.addLangs([
        'ru',
        'en',
        'de',
        'fr',
        'it',
        'es',
      ]);
     this.translate.setDefaultLang('en');
      // this.translate.use('ru');
      //
      // this.translate.use('en');
      var language = window.navigator ? (window.navigator['language'] ||
        window.navigator['systemLanguage'] ||
        window.navigator['userLanguage']) : "en";
      if (language){
        language = language.substr(0, 2).toLowerCase();
      }
      // alert(language)
      if (this.translate.getLangs().indexOf(language) != -1){

      }

      this.translate.use(language);

    }



}
