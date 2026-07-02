import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';
import {HelpersService} from '../../_services/helpers.service';
import {Dialog} from 'src/app/_models/message';
import {MessageService} from '../../_services/message.service';

@Component({
  selector: 'app-view-dialogs',
  templateUrl: './view-dialogs.component.html',
  styleUrls: ['./view-dialogs.component.scss']
})
export class ViewDialogsComponent implements OnInit {
  newDialog = false;
  subscribers = [];

  filterText = '';
  usersFromsendMess = [];
  textFromAllUsers;
  constructor(public user:UserService,public dataService:DataService,public help:HelpersService,public mS:MessageService) { }
    filter(array=[]){
        var t = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty('title')&&array[i].title.toLowerCase().indexOf(this.filterText.toLowerCase())>-1){
          t.push(array[i]);
        }
        if (array[i].hasOwnProperty('username')&&array[i].username.toLowerCase().indexOf(this.filterText.toLowerCase())>-1){
          t.push(array[i]);
        }

      }
        return t;
    }
  incPmDialog(dialog){
    if (dialog.new_messages>0){
      this.user.profile.pm-=dialog.new_messages
      dialog.new_messages = 0
    }

  }
  ngOnInit() {
    console.log('INIT DIALOGGGGGGGGGGGGGGGGG');
    this.dataService.send({
      method: 'pm.main',
      session: this.user.profile.token,
      offset: -1
    }).then( data => {
      console.log('------------',data['dialogs'] );
      let newDialog = []
      let d = data['dialogs'] as Dialog[]||[]
      d.map(dialog=>{
          let oldDialog = this.mS.dialogs.find(di=>di.id===dialog.id)
          if (oldDialog){
            dialog = oldDialog

          }
        console.log('DIALOGGGG',dialog);
      })
      console.log('DIALOGGGG');
      this.mS.dialogs = data['dialogs'] as Dialog[]||[]
      // this.mS.dialogs = Object.assign(data['dialogs'] as Dialog[]||[],this.mS.dialogs);
    }).catch(data => {
      console.log("errorrrrrrrrrrr",data);
    });

  }
  setUserFromMessage(user,event){
    if (event.target.checked){
      this.usersFromsendMess.push(user);
    }else{
      for (var i = 0; i < this.usersFromsendMess.length; i++) {
      if (this.usersFromsendMess[i].id==user.id){
        this.usersFromsendMess.splice(i,1);
      }

      }
    }

  }
  setAvatar(img){
    return img.replace("http://","https://")
  }
  sendMessage(){
    for (var i = 0; i < this.usersFromsendMess.length; i++) {
      this.dataService.send({
        method:'pm.send',
        session:this.user.profile.token,
        chat_id:this.usersFromsendMess[i].id,
        message:this.textFromAllUsers
      }).then(data=>{
        this.newDialog = false;
        this.textFromAllUsers = '';
        this.ngOnInit();

      }).catch(data=>{

      });

    }

  }
  setNewDialog(){
    this.newDialog = !this.newDialog;
    this.dataService.send({
      method:'users.subscribers',
      session:this.user.profile.token,
      offset:-1
    }).then(data=>{
      this.subscribers = data['data'];

    }).catch(data=>{

    });
  }
}
