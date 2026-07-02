import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {DataService} from '../../_services/data.service';
import {ModalService} from '../../_services/modal.service';
import {Post} from '../../_models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  subscribers = [];
  subscriptions = [];
  activeTab = 'posts';
  last_post = '0';
  skip = 0;
  limit = 5;

  constructor(public user: UserService, public dataService: DataService, public mS: ModalService) {
  }

  onUp() {

  }

  getPost() {
    if (this.limit == 0) {
      return;
    }
    this.dataService.send({
      method: 'users.posts',
      session: this.user.profile.token,
      offset: this.last_post,
      skip: this.skip,
      limit: this.limit
    }).then(data => {
      if ((<Post[]>data['data']).length < this.limit) {
        this.limit = 0;
      }
      this.skip += this.limit;

      this.posts = this.posts.concat(data['data']);
      if (this.posts.length > 0) {
        this.last_post = this.posts[this.posts.length - 1].id;
      }
    }).catch(data => {

    });
  }

  ngOnInit() {

    this.getPost();
    this.dataService.send({
      method: 'users.subscriptions',
      session: this.user.profile.token
    }).then(data => {

      data['data'] ? this.subscriptions = data['data'] : null;

    }).catch(data => {

    });

  }

}
