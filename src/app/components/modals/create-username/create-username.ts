import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';
import {Location} from '@angular/common';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-create-username',
  templateUrl: './create-username.html',
  styleUrls: ['./create-username.scss']
})
export class CreateUsernameModal implements OnInit {
  open = false;
  errorusername = false;

  constructor(private location: Location, private auth: AuthService, private dataService: DataService, public user: UserService, public mS: ModalService) {
  }

  ngOnInit() {
  }

  cancel() {
    this.location.back();
  }

  checkName() {

    this.dataService.send({
      method: 'users.check_username',
      username: this.auth.username
    }).then(data => {
      if (data.hasOwnProperty('username')) {
        if (data['username'] == false) {
          this.auth.error = true;
          this.errorusername = true;
        } else {
          this.auth.error = false;
          this.errorusername = false;
        }
      } else {
        this.auth.error = true;
        this.errorusername = true;
      }
    });
  }

  setUsername() {
    this.dataService.send({
      method: 'users.auth.facebook',
      token: this.auth.token,
      username: this.auth.username
    }).then(data => {
      if (data.hasOwnProperty('session')) {
        this.user.setUser(data['session'], function () {
        });
        this.mS.createUsernameModal.view = false;
      } else {
        this.auth.error = true;
      }
    });
  }


}
