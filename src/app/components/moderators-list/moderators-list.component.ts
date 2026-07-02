import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {UserService} from '../../_services/user.service';
import {Channel} from '../../_models/channel';
import {User} from 'src/app/_models/user';
import {ModalService} from '../../_services/modal.service';

@Component({
  selector: 'app-moderators-list',
  templateUrl: './moderators-list.component.html',
  styleUrls: ['./moderators-list.component.scss']
})
export class ModeratorsListComponent implements OnInit {
  @Input() channel: Channel;
  @Output('exit') exit = new EventEmitter<boolean>();
  add_moderator = false;
  moderators = [];
  search_text;
  search_user:User[] = [];
  constructor(private dataService:DataService,public user:UserService,private mS:ModalService) { }
  saveData(){}
  ngOnInit() {
    this.dataService.send({
      method:'channels.moderators',
      session:this.user.profile.token,
      channel_id:this.channel.id
    }).then(data=>{

this.moderators = data['data'];

    }).catch(err=>{});

  }
  searchUser(){
    if (this.search_text){
      this.dataService.send({
        method:'search.user',
        session:this.user.profile.token,
        query:this.search_text
      }).then(data=>{
        this.search_user = <User[]>data['data'];
      }).catch(data=>{});
    }

  }
  deleteModerator(item){
    this.mS.deleteModeratorModal.view = true;
    this.mS.deleteModeratorModal.data = {
      user_id:item.user_id,
      channel_id:this.channel.id,
      user_name:item.user_name,
    };
    console.log(this.mS.deleteModeratorModal.data);
    this.mS.deleteModeratorModal.emit.subscribe(data=>{
      if (data){
        this.add_moderator = false;
        this.ngOnInit()
      }


    });

    document.getElementsByTagName('body')[0].classList.add('hidden_body');



  }
  initModerator(item){

    this.dataService.send({
      method:'mod.channels.mod_add',
      session:this.user.profile.token,
      channel_id:this.channel.id,
      user_id:item.id
    }).then(data=>{
      this.add_moderator = false;
      this.ngOnInit()
    }).catch(data=>{});
  }
  addModerator(){
    this.add_moderator = true;

  }
  exitModal(){

    this.exit.emit(true);
  }
}
