import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';

import {ModalService} from '../../_services/modal.service';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
    activeTab = 'main'

  constructor(public router: Router, private dataService:DataService,public user:UserService,private mS:ModalService,private auth:AuthService) {
    if (this.router.url=='/main'||this.router.url=='/join') {
      this.activeTab = 'main'
    }
    else{
      this.activeTab='pop';
    }
  }

  ngOnInit() {
  }

  LoginWithFacebook(){
    this.auth.LoginWithFacebook()
  }

}
