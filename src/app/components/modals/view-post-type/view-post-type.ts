import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../_services/modal.service";
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';




@Component({
    selector: 'view-post-type',
    templateUrl: './view-post-type.html',
    styleUrls: ['./view-post-type.scss']
})
export class ViewPostTypeModal implements OnInit {
    @Input() type: number = 0;
    @Output('changeType') changeType = new EventEmitter<any>();

    constructor(public mS:ModalService,private user:UserService,private dataService:DataService) { }
    ngOnInit(){}
    save(t){
      if (!this.user.profile.token){return}
      let s = {
        method:'users.settings.main.save',
        session:this.user.profile.token,
        feed:t
      }
      this.dataService.send(s).then(data=>{

      }).catch(err=>{})
    }

}
