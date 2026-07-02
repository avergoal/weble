import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {ModalService} from '../../../_services/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from '../../../_services/data.service';

@Component({
  selector: 'app-set-lang-app',
  templateUrl: './set-lang-app.component.html',
  styleUrls: ['./set-lang-app.component.scss']
})
export class SetLangAppComponent implements OnInit {
  lang
  constructor(public mS:ModalService,private translate: TranslateService,private user:UserService,private dataService:DataService) { }
  ngOnChanges(changes: any) {
    if (changes){

    }
    this.lang = this.user.profile.settings.lang
  }
  ngOnInit() {

    this.lang = this.user.profile.settings.lang

  }
  setLang(l){
    this.translate.use(l);
    this.user.profile.settings.lang = l
    this.mS.setLangModal.view = false
    let s = {
      method:'users.settings.main.save',
      session:this.user.profile.token,
      lang:l
    }
    this.dataService.send(s).then(data=>{

    }).catch(err=>{})
  }
  closeModal(){
    this.mS.setLangModal.view = false
  }

}
