import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Dialog, Message} from '../_models/message';
import {UserService} from './user.service';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  dialogs: Dialog[] = [];
  audio = new Audio('assets/audiosms.mp3');

  constructor(private dataService: DataService, public user: UserService) {

    this.dataService.messages['EVENT/IncomingMessage'].subscribe(data => {
      this.audio.play();
      this.getDialog(data);
      this.user.profile.pm = this.getCountNewMessages();
      this.scrollBot();
      this.dialogs.sort((a, b) => {
        return b.last_message.created_at - a.last_message.created_at;
      });
    });
  }

getAllDialog(){
  this.dataService.send({
    method: 'pm.main',
    session: this.user.profile.token,
    offset: -1
  }).then(data => {
    this.dialogs = data['dialogs'] as Dialog[] || [];
  }).catch(data => {

  });
}

  scrollBot() {
    setTimeout(() => {
      let el = document.getElementsByClassName('di_p');
      console.log(el.length);
      if (el && el.length) {
        el[el.length - 1].scrollIntoView({block: 'center', inline: 'nearest'});
      }

    }, 5);
  }
  clearDialogs() {
    this.dialogs = [];
  }
  getCountNewMessages() {
    let count = 0;
    this.dialogs.map(dialog => {
      if (dialog.new_messages > 0) {
        count++;
      }

    });
    return count;
  }

  getDialog(data): Dialog {

    const dialog = this.dialogs.find(a => a.id === data.chat_id);

    if (dialog) {
      console.log(dialog);
      const m = <Message>{
        id: data.message.id,
        new: true,
        unread: true,
        text: data.message.text,
        created_at: data.message.created_at,
        status: 1,
        user: data.message.user
      };
      dialog.messages ? dialog.messages.push(m) : dialog.messages = [m];

      dialog.last_message = m;
      dialog.new_messages++;

      return dialog;
    } else {
      const dialog = <Dialog>{
        avatars: [data.message.user.avatar],
        id: data.chat_id,
        last_message: <Message>{
          id: data.message.id,
          new: true,
          unread: true,
          text: data.message.text,
          created_at: data.message.created_at,
          status: 1,
          user: data.message.user
        },
        messages: [<Message>{
          id: data.message.id,
          new: true,
          unread: true,
          text: data.message.text,
          created_at: data.message.created_at,
          status: 1,
          user: data.message.user
        }],
        new_messages: 1,
        title: data.message.user.username,
        type: 1,
      };
      this.dialogs.push(dialog);
      return dialog;
    }

  }

}
