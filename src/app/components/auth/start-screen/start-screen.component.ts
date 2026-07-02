import { Component, OnInit } from '@angular/core';

import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';
import {ModalService} from '../../../_services/modal.service';
import {AuthService} from '../../../_services/auth.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

declare var navigator;

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor( private mS: ModalService,private auth:AuthService,public _location: Location,private uS:UserService,public router: Router) {}

  ngOnInit() {
    if (this.uS.profile&&this.uS.profile.id){
      this.router.navigate(['/hotlist']);
    }
  }
  LoginWithFacebook(){
    this.auth.LoginWithFacebook()
  }



}
