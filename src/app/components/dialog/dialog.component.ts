import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {ModalService} from '../../_services/modal.service';
import {DataService} from '../../_services/data.service';
import {Dialog, Message} from 'src/app/_models/message';
import {User} from 'src/app/_models/user';
import {HelpersService} from '../../_services/helpers.service';
import {Post} from '../../_models/post';
import {MessageService} from '../../_services/message.service';
declare let cordova: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('textArea', {read: ElementRef}) textArea: ElementRef;
  _id;
  profile: User;

  text = '';
  type_chat = 0;
  px = '0px';

  constructor(
    public help: HelpersService,
    private route: ActivatedRoute,
    public _location: Location,
    public user: UserService,
    public mS: ModalService,
    public messageService: MessageService,
    private dataService: DataService
  ) {
    this.route.params.subscribe(params => {
      this._id = route.snapshot.params['id'];
    });
  }

  public autoGrow() {
    const textArea = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  dateLine(i) {
    if (!this.getDialog.messages[i]) {
      return false;
    }
    if (i == 0) {
      return true;
    }
    let date1 = new Date(this.getDialog.messages[i - 1].created_at * 1000).getDate();
    let date2 = new Date(this.getDialog.messages[i].created_at * 1000).getDate();

    if (date1 != date2) {
      return true;
    }
    return false;
  }

  selector: string = '.dialog_block';
  skip = 0;
  limit = 20;
  offset = -1;

  focusText() {
    this.scrollBot();
    console.log('FOCUS');
  }

  blurText(event) {


    this.scrollBot();
    console.log('BLUR');

  }

  scrollBot() {
    setTimeout(() => {
      var el = document.getElementsByClassName('di_p');
      console.log(el.length);
      if (el && el.length) {
        el[el.length - 1].scrollIntoView({block: 'center', inline: 'nearest'});
      }

    }, 5);
  }
  ngOnDestroy(){
    let dialog = this.messageService.dialogs.find(a => a.id === this._id);
    dialog.new_messages = 0
  }
  get getDialog(): Dialog {
    let dialog = this.messageService.dialogs.find(a => a.id === this._id);
    if (!dialog) {
      console.log(this.profile);
      dialog = <Dialog>{
        avatars: [this.profile.avatar],
        id: this._id,
        last_message: {},
        new_messages: 0,
        messages: [],
        title: this.profile.username,
        type: 1
      };
      this.messageService.dialogs.push(dialog);
    }
    return dialog;
  }

  getMessage(firts = false) {
    if (this.limit == 0) {
      return;
    }
    this.dataService.send({
      method: 'pm.chat',
      session: this.user.profile.token,
      chat_id: this._id,
      offset: this.offset
    }).then(data => {
      this.offset = data['offset'];
      if (data['offset'] < this.limit) {
        this.limit = 0;
      }
      this.skip += this.limit;
      this.type_chat = data['type'];
      this.getDialog.messages = <Message[]>data['data'].concat(this.getDialog.messages || []);
      if (this.getDialog.messages.length > 0) {
        this.offset = data['offset'];
      }
      if (firts) {

        this.getMessage(false);

      }
      this.scrollBot();
      // this.messages = <Message[]>data['data'];
    }).catch(data => {
    });
  }

  sendMessage() {

    // window.setTimeout(function () {
    //   document.getElementById('send_btn').focus()
    // }, 0);
    this.dataService.send({
      method: 'pm.send',
      session: this.user.profile.token,
      chat_id: this._id,
      message: this.text
    }).then(data => {
      let m = <Message>{
        id: data['msg_id'],
        new: false,
        status: 0,
        text: this.text,
        created_at: Math.floor(+new Date() / 1000),
        unread: true,
        user: <User>this.user.profile,
      };
      this.getDialog.messages.push(m);
      this.getDialog.last_message = m;
      this.text = '';
      setTimeout(() => {
        this.autoGrow();
        this.scrollBot();
      }, 50);
    }).catch(data => {
      console.log('ERR', data);
    });
  }
  showKeyboard(){
   // cordova.Keyboard.show()
  }
  hideKeyboard(){
   // cordova.Keyboard.hide()
  }
  ngOnInit() {
    if (this._id != undefined) {

      this.dataService.send({
        method: 'users.get',
        session: this.user.profile.token,
        user_id: this._id
      }).then(data => {

        this.profile = <User>Object.assign({}, data);
        this.getDialog.messages = []
        console.log('RSPprofile', this.profile);
      }).catch(data => {
        console.log('ERR', data);
      });
      this.getMessage(true);


    }

  }

}
