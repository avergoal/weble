import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';
import {ModalService} from '../../../_services/modal.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {
  typeRepotr = 1;
  @Input() type: any;
  @Input() show: any;
  @Input() id: any;
  @Output('exit') exit = new EventEmitter<boolean>();

  constructor(private dataService: DataService, private user: UserService, private mS: ModalService) {
  }

  ngOnChanges(changes: any) {

    if (changes.show && changes.show.currentValue) {
      document.getElementsByTagName('body')[0].classList.add('hidden_body');
    }
  }

  ngOnInit() {
  }

  exitModal() {
    document.getElementsByTagName('body')[0].classList.remove('hidden_body');
    this.mS.reportModal.view = false;
    this.exit.emit(true);
  }

  report() {


    if (this.type == 'post') {
      this.dataService.send({
        method: 'posts.abuse',
        session: this.user.profile.token,
        post_id: this.id,
        abuse: this.typeRepotr
      }).then(data => {

        this.exit.emit(true);
        this.mS.reportModal.callback();
        this.mS.reportModal.hide();
        this.exitModal();
      }).catch(() => {
        this.exit.emit(true);
        this.mS.reportModal.callback();
        this.mS.reportModal.hide();
        this.exitModal();
      });
    } else if (this.type == 'channel_id') {
      this.dataService.send({
        method: 'channels.abuse',
        session: this.user.profile.token,
        channel_id: this.id,
        abuse: this.typeRepotr
      }).then(data => {
        this.exit.emit(true);
        this.mS.reportModal.callback();
        this.mS.reportModal.hide();
        this.exitModal();
      }).catch(() => {
        this.exit.emit(true);
        this.mS.reportModal.callback();
        this.mS.reportModal.hide();
        this.exitModal();
      });

    } else if (this.type == 'comments') {
      this.dataService.send({
        method: 'comments.abuse',
        session: this.user.profile.token,
        comment_id: this.id,
        abuse: this.typeRepotr
      }).then(data => {
        this.exit.emit(true);
        this.mS.reportModal.callback();
        this.mS.reportModal.hide();
        this.exitModal();
      }).catch(() => {
        this.exit.emit(true);
        this.mS.reportModal.callback();
        this.mS.reportModal.hide();
        this.exitModal();
      });

    } else {

    }
    this.exitModal();


  }
}
