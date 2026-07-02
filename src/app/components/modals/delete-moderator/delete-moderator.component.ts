import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-delete-moderator',
  templateUrl: './delete-moderator.component.html',
  styleUrls: ['./delete-moderator.component.scss']
})
export class DeleteModeratorComponent implements OnInit {
  @Input() show: any;
  open = false
  constructor(public mS:ModalService,private dataService:DataService,private user:UserService) { }

  ngOnChanges(changes: any) {

    if (changes.show&&changes.show.currentValue){
      document.getElementsByTagName('body')[0].classList.add("hidden_body");
    }
  }
  ngOnInit(){}
  deletePost(r){
    document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    if (!r){
      this.mS.deleteModeratorModal.view = false
      this.mS.deleteModeratorModal.data = {}
      return
    }

    this.dataService.send({
      method:'mod.channels.mod_del',
      session:this.user.profile.token,
      channel_id:this.mS.deleteModeratorModal.data['channel_id'],
      user_id:this.mS.deleteModeratorModal.data['user_id']
    }).then(data=>{
      this.mS.deleteModeratorModal.emit.emit(true)
      this.mS.deleteModeratorModal.view = false
      this.mS.deleteModeratorModal.data = {}
    }).catch(data=>{});
  }

}
