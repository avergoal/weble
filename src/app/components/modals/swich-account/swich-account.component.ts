import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ModerateService} from '../../../_services/moderate.service';

@Component({
  selector: 'app-swich-account',
  templateUrl: './swich-account.component.html',
  styleUrls: ['./swich-account.component.scss']
})
export class SwichAccountComponent implements OnInit {
  profiles
  @Input() show: any;
  @Input() type: number = 0;
  @Output('changeType') changeType = new EventEmitter<any>();

  ngOnChanges(changes: any) {
    console.log("changes.show",changes.show);
    if (changes.show&&changes.show.currentValue){
      document.getElementsByTagName('body')[0].classList.add("hidden_body");
    }
    if (changes.show&&changes.show.currentValue==false){
      document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    }
  }
  constructor(public mS:ModalService,private user:UserService, public router: Router,private moderateService:ModerateService,private dataService:DataService ) { }
  ngOnInit(){
    this.profiles = JSON.parse(localStorage.getItem("profile"));
  }
  isCheck(token){
    if (this.user.profile.token==token){return true}else{return false}



  }
  setAccount(profile){

    this.moderateService.modposts = [];
    this.moderateService.notifyArr = [];
    this.moderateService.activeModCh_id = null;

    this.user.profile = profile

    localStorage.setItem("token",profile.token);

    this.user.setUser(profile.token, ()=>{})
    this.router.navigate(['/main-popular']);
    this.mS.swichAccountModal.view = false
  }


}
