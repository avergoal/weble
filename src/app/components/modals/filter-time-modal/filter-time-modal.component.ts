import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-filter-time-modal',
  templateUrl: './filter-time-modal.component.html',
  styleUrls: ['./filter-time-modal.component.scss']
})
export class FilterTimeModalComponent implements OnInit {
  @Output('changeType') changeType = new EventEmitter<any>();
  constructor(public mS:ModalService,private user:UserService) { }

  ngOnInit() {
  }
  change(){
    this.user.EVENT.filterTime.emit(this.mS.filterTimeModal.type)
    this.changeType.emit(this.mS.filterTimeModal.type)
    this.mS.filterTimeModal.view = false
  }

}
