import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.scss']
})
export class DeleteCommentComponent implements OnInit {
  @Input() show: any;
  open = false
  constructor(public mS:ModalService,private dataService:DataService,private user:UserService) { }

  ngOnChanges(changes: any) {

    if (changes.show&&changes.show.currentValue){
      document.getElementsByTagName('body')[0].classList.add("hidden_body");
    }
  }
  ngOnInit(){

  }
  deletePost(r){
    document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    if (!r){
      this.mS.deleteCommentModal.view = false
      this.mS.deleteCommentModal.data = {}
      return
    }

    let id = this.mS.deleteCommentModal.data['th']?this.mS.deleteCommentModal.data['th'].id:this.mS.deleteCommentModal.data['comment'].id;
    this.dataService.send({
      method:'comments.delete',
      session:this.user.profile.token,
      comment_id:id
    }).then(data=>{

      this.mS.deleteCommentModal.emit.emit(true)
      this.mS.deleteCommentModal.view = false
      this.mS.deleteCommentModal.data = {}
    }).catch(data=>{

    })

  }
}
