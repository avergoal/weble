import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';
import {HelpersService} from '../../../_services/helpers.service';
import {ProfileComment} from '../../../_models/comment';

@Component({
  selector: 'app-pers-coment',
  templateUrl: './pers-coment.component.html',
  styleUrls: ['./pers-coment.component.scss']
})
export class PersComentComponent implements OnInit {
comments = []
  @Input() user_id: any;
  constructor(public user:UserService,private dataService:DataService,public help:HelpersService) { }

  ngOnInit() {

    let q = {
      method:'users.comments',
      session:this.user.profile.token,
      last:0
    }
    if (this.user_id){
      q['user_id'] = this.user_id
    }
    this.dataService.send(q).then(data=>{
     this.comments = <ProfileComment[]>data['data']

    }).catch(data=>{

    })
  }

}
