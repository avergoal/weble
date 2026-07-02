import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {
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
      this.mS.deletePostModal.view = false
      this.mS.deletePostModal.data = {}
      return
    }
    this.dataService.send({
      method: 'posts.delete',
      session: this.user.profile.token,
      post_id: this.mS.deletePostModal.data['id']
    }).then(data => {
      this.mS.deletePostModal.emit.emit(true)
      this.mS.deletePostModal.view = false
      this.mS.deletePostModal.data = {}
    }).catch(() => {
    });
  }

}
