import { Component, OnInit } from '@angular/core';
import {DataService} from '../../_services/data.service';
import {UserService} from '../../_services/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  pass_old
  pass_new
  pass_check
  constructor(public _location: Location,private dataservice:DataService,private user:UserService) { }

  ngOnInit() {

  }

  save(){
    this.dataservice.send({
      method:'users.secure.save',
      session:this.user.profile.token,
      pass_old:this.pass_old,
      pass_new:this.pass_new,
      pass_check:this.pass_check,
    }).then(data=>{


    }).catch(()=>{})
  }
}
