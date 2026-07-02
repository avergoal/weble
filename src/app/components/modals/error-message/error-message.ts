import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';


@Component({
  selector: 'error-message',
  templateUrl: './error-message.html',
  styleUrls: ['./error-message.scss']
})
export class ErorMessageModal implements OnInit {
  @Input() show: any;
  open = false;

  constructor(public mS: ModalService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    console.log(this.mS.errorModal);
    if (changes.show && changes.show.currentValue) {

      document.getElementsByTagName('body')[0].classList.add('hidden_body');
    }
  }

}
