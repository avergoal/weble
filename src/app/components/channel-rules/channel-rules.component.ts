import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-channel-rules',
  templateUrl: './channel-rules.component.html',
  styleUrls: ['./channel-rules.component.scss']
})
export class ChannelRulesComponent implements OnInit {
  rules = ''
  @Input() channel_id: any = [];
  @Output('exit') exit = new EventEmitter<boolean>()
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.send({
      method:'channels.rules',
      channel_id:this.channel_id
    }).then(data=>{

      this.rules =data['data']
    }).catch(err=>{})
  }
  exitModal(){
    this.exit.emit(true)
  }

}
