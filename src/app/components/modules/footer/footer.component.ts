import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {Router} from '@angular/router';
import {MessageService} from '../../../_services/message.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  px = '0px'

  constructor(public user:UserService,   public router: Router,public messageService:MessageService) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (!val||!val.url){return}
      if (val.url.indexOf('main-popular')>0){this.user.activTab = 1;}
      if (val.url.indexOf('search_chennel')>0){this.user.activTab = 2;}
      if (val.url.indexOf('create_new_post')>0){this.user.activTab = 3;}
      if (val.url.indexOf('join')>0){this.user.activTab = 3;}
      if (val.url.indexOf('view_dialogs')>0){this.user.activTab = 4;}
      if (val.url.indexOf('profile')>0){this.user.activTab = 5;}


    });
  }
}
