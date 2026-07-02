import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../_services/user.service';
import {DataService} from '../../../_services/data.service';
import {HelpersService} from '../../../_services/helpers.service';
import {Post} from '../../../_models/post';

@Component({
  selector: 'app-pers-notify',
  templateUrl: './pers-notify.component.html',
  styleUrls: ['./pers-notify.component.scss']
})
export class PersNotifyComponent implements OnInit {
  notify = []
  @Input() user_id: any;

  timer_1  = {
    min:0,
    max:86400,
    init:0
  }
  timer_2  = {
    min:86400,
    max:86400*2,
    init:0
  }
  timer_7  = {
    min:86400*2,
    max:86400*7,
    init:0
  }
  timer_30  = {
    min:86400*7,
    max:86400*30,
    init:0
  }
  timer_365  = {
    min:86400*30,
    max:9999999999999,
    init:0
  }
  limit = 5
  last_notify = 0
  skip = 0
  constructor(public user:UserService,private dataService:DataService,public help:HelpersService) { }
  isDateText(item){

    let created_at =  item.created_at
    created_at = Math.floor(+new Date()/1000)- parseInt(created_at)

    if (created_at>this.timer_1.min&&created_at<this.timer_1.max&&this.timer_1.init<1){
      this.timer_1.init++
      return 'СЕГОДНЯ'
    }else  if (created_at>this.timer_2.min&&created_at<this.timer_2.max&&this.timer_2.init<1){
      this.timer_2.init++
      return 'Вчера'
    }else  if (created_at>this.timer_7.min&&created_at<this.timer_7.max&&this.timer_7.init<1){
      this.timer_7.init++
      return 'На этой неделе'
    }else  if (created_at>this.timer_30.min&&created_at<this.timer_30.max&&this.timer_30.init<1){
      this.timer_30.init++
      return 'В этом месяце'
    }else  if (created_at>this.timer_365.min&&created_at<this.timer_365.max&&this.timer_365.init<1){
      this.timer_365.init++
      return 'За все время'
    }
    return ''
  }
  getNotify(){
    if (this.limit==0){return;}
    let q = {
      method:'users.notifications',
      session:this.user.profile.token,
      offset:this.last_notify,
      skip:this.skip,
      limit:this.limit,
      last:this.last_notify
    }
    if (this.user_id){
      q['user_id'] = this.user_id
    }
    this.dataService.send(q).then(data=>{
      if (!data['data']){return}
      if ((data['data']).length<this.limit){
        this.limit=0
      }
      this.skip+=this.limit
      this.timer_1.init = 0
      this.timer_2.init = 0
      this.timer_7.init = 0
      this.timer_30.init = 0
      this.timer_365.init = 0
      this.notify = this.notify.concat(data['data'])
      for (var i = 0; i < this.notify.length; i++) {
        this.notify[i].isDateText = this.isDateText(this.notify[i])

        if (this.notify[i].type==1){this.notify[i].url = ["/post-detail",this.notify[i].post.id]}
        if (this.notify[i].type==2){this.notify[i].url = ["/post-detail",this.notify[i].post.id]}
        if (this.notify[i].type==3){this.notify[i].url = ["/user-profile",this.notify[i].user.id]}
        if (this.notify[i].type==11){this.notify[i].url = []}
        if (this.notify[i].type==12){this.notify[i].url = []}

      }



      if (this.notify.length>0){
        this.last_notify+=this.notify.length
      }
    }).catch(data=>{

    })
  }
  ngOnInit() {
    this.getNotify()
  }
}

