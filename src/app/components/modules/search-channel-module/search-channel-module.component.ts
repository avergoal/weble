import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from 'src/app/_services/data.service';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {UserService} from '../../../_services/user.service';
import {Channel} from '../../../_models/channel';

@Component({
  selector: 'app-search-channel-module',
  templateUrl: './search-channel-module.component.html',
  styleUrls: ['./search-channel-module.component.scss']
})
export class SearchChannelModuleComponent implements OnInit {
  search_text;
  channel = null
  searchArr = [];
  searchArrFilter = [];
  constructor(public dataService:DataService,public user:UserService) { }
  @Output('channel') channelOut = new EventEmitter<any>();
  @Output('exit') exit = new EventEmitter<any>();
  ngOnInit() {
    this.dataService.send({
      method:'users.channels',
      session:this.user.profile.token,

    }).then(data=>{
      if (data['data']){
        let arr = <Channel[]>data['data']
        for (var i = 0; i < data['data'].length; i++) {
          this.searchArr.push({
            name:arr[i].name,
            img:arr[i].avatar,
            count:arr[i].subscribers,
            icon:arr[i].is_subscriber,
            id:arr[i].id,
            type:'channels'
          });
        }
        this.searchArrFilter = this.searchArr
        //this.searchArr = Object.assign(this.searchArr,data['channels'])
      }


    }).catch(data=>{
      console.log(data);
    });
  }
  changeChannel(){
    this.channelOut.emit(this.channel)
  }

  search(){
    this.searchArrFilter = []
    if (!this.search_text||this.search_text==''){
      this.searchArrFilter = this.searchArr
      return
    }

    for (var i = 0; i < this.searchArr.length; i++) {
      if (this.searchArr[i].name.toLowerCase().indexOf(this.search_text.toLowerCase())>-1){
        this.searchArrFilter.push(this.searchArr[i])
      }
    }
  }
}
