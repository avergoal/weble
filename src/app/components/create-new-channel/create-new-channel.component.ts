import { Component, OnInit } from '@angular/core';
import {DataService} from '../../_services/data.service';
import {UserService} from '../../_services/user.service';
import {ModalService} from '../../_services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-new-channel',
  templateUrl: './create-new-channel.component.html',
  styleUrls: ['./create-new-channel.component.scss']
})
export class CreateNewChannelComponent implements OnInit {
  name:string
  description:string = ''
  rules:string
  category_id:any;
  is_read = false
  category_search = false
  uploadAvatar
  attachment
  nsfw = 0
  ch_rules
  constructor(private dataService:DataService,private user:UserService,private mS:ModalService,public router: Router) { }
  setFile(e){
    console.log(e);
    this.attachment = e
  }
  create(){
    this.nsfw?this.nsfw = 1:this.nsfw = 0

    if (!this.is_read){
      this.mS.error("Примите правила")
      return
    }
    if (this.description.length>300){
      this.mS.error("длина описания слишком большая")
      return
    }

    if (this.is_read&&this.name&&this.description&&this.rules&&this.category_id&&this.category_id.cat_id){


      this.dataService.send({
        method:'channels.create',
        session: this.user.profile.token,
        description:this.description,
        name:this.name,
        oc:this.is_read,
        nsfw:this.nsfw,
        rules:this.rules,
        attachment:this.attachment,
        category_id:this.category_id['cat_id']

      }).then(data=>{
        this.router.navigate(['/channel_viwe',data['channel_id']]);
        console.log('RSP',data)
      }).catch(data=>{
        console.log('ERR',data)
      })
    }else{
      this.mS.error("не все поля заполнены")
    }

  }
  ngOnInit() {
    console.log(this.dataService.categories);

  }

}
