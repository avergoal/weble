import {Component, Input, OnInit} from '@angular/core';
import {HelpersService} from '../../../_services/helpers.service';
import {ModalService} from '../../../_services/modal.service';
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html',
  styleUrls: ['./subscribe-modal.component.scss']
})
export class SubscribeModalComponent implements OnInit {
  @Input() show: any;
  constructor(public mS:ModalService,public uS:UserService,private dataService:DataService,public router: Router) { }

  ngOnChanges(changes: any) {

    if (changes.show&&changes.show.currentValue){
      document.getElementsByTagName('body')[0].classList.add("hidden_body");
    }
  }
  ngOnInit() {
  }

  cancel(){
    document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    this.mS.subscribeModal.hide()
  }
  init(){
    document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    if (!this.uS.auth){
      this.cancel()
      this.router.navigate(['/join']);
      return
    }
    var t  = {
      session:this.uS.profile.token,
    }
    var type = this.mS.subscribeModal.type?'subscribe':'unsubscribe'

    if (this.mS.subscribeModal.data.type=='user'){
      this.mS.subscribeModal.type?this.uS.profile.subscriptions++:this.uS.profile.subscriptions--
      t['method'] = 'users.'+type
      t['user_id'] = this.mS.subscribeModal.data.id
    }

    if (this.mS.subscribeModal.data.type=='channels'){
      t['method'] = 'channels.'+type
      t['channel_id'] = this.mS.subscribeModal.data.id
    }
    this.dataService.send(t).then(data=>{
      this.mS.subscribeModal.callback(data)
      this.mS.subscribeModal.hide()
    }).catch(data=>{
      this.mS.subscribeModal.hide()

    })
  }

}
