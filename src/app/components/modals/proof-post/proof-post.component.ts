import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';
import {ModerateService} from '../../../_services/moderate.service';

@Component({
  selector: 'app-proof-post',
  templateUrl: './proof-post.component.html',
  styleUrls: ['./proof-post.component.scss']
})
export class ProofPostComponent implements OnInit {

  open = false
  opt = null
  comment = ''
  constructor(public mS:ModalService,private dataService:DataService,private user:UserService,public modS:ModerateService) { }
  ngOnChanges(changes: any) {

    if (changes.show&&changes.show.currentValue){
      document.getElementsByTagName('body')[0].classList.add("hidden_body");
    }
  }
  ngOnInit(){}
  cancel(){
    document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    this.mS.proofPostModal.view = false
    this.mS.proofPostModal.data = {}
    this.mS.proofPostModal.emit.emit(false)
    return
  }
  proof(){
    document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    for (var i = 0; i < this.modS.modposts.length; i++) {
      if (this.modS.modposts[i].id==this.mS.proofPostModal.data['id']){
        this.modS.modposts.splice(i,1)
        break
      }

    }
    // return
    if (this.mS.proofPostModal.data['val']==true){
      this.dataService.send({
        method: 'mod.posts.accept',
        session: this.user.profile.token,
        post_id: this.mS.proofPostModal.data['id'],
        reply:this.opt,
        note:this.comment

      }).then(data => {
        for (var i = 0; i < this.modS.notifyArr.length; i++) {
          if (this.modS.notifyArr[i].id==this.modS.activeModCh_id){
            this.modS.notifyArr[i].notifications--
            if (this.modS.notifyArr[i].notifications==0){
              this.modS.notifyArr.splice(i,1)
              this.modS.activeModCh_id = null
            }
          }
        }
        this.mS.proofPostModal.emit.emit(this.mS.proofPostModal.data['val'])
        this.mS.proofPostModal.view = false
        this.mS.proofPostModal.data = {}

      }).catch(() => {
      });
    }
    else if (this.mS.proofPostModal.data['val']==false){
      this.dataService.send({
        method: 'mod.posts.decline',
        session: this.user.profile.token,
        post_id: this.mS.proofPostModal.data['id'],
        reply:this.opt,
        note:this.comment
      }).then(data => {
        for (var i = 0; i < this.modS.notifyArr.length; i++) {
          if (this.modS.notifyArr[i].id==this.modS.activeModCh_id){
            this.modS.notifyArr[i].notifications--
            if (this.modS.notifyArr[i].notifications==0){
              this.modS.notifyArr.splice(i,1)
              this.modS.activeModCh_id = null
            }
          }
        }
        this.mS.proofPostModal.emit.emit(this.mS.proofPostModal.data['val'])
        this.mS.proofPostModal.view = false
        this.mS.proofPostModal.data = {}
      }).catch(() => {
      });
    }

  }

}
