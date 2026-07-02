import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DataService} from '../../_services/data.service';
import {UserService} from '../../_services/user.service';
import {ImageService} from '../../_services/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Attachments, Post} from 'src/app/_models/post';
import {Channel} from '../../_models/channel';

declare var $;

@Component({
  selector: 'app-view-modal-create',
  templateUrl: './view-modal-create.component.html',
  styleUrls: ['./view-modal-create.component.scss']
})
export class ViewModalCreateComponent implements OnInit {
  title = '';
  text = '';
  spoiler = 0;
  NSFW = 0;
  _id;
  settingFoto = {};
  tags = [];
  addImg = false;
  setHashTags = false;
  arrImg: Attachments[] = [];
  pubicType = 0;
  getChannel = false;
  channel: Channel;
  uploadFiles = false;
  editPost = false;

  constructor(private route: ActivatedRoute, public _location: Location, public dataService: DataService, public user: UserService, public imageService: ImageService, public router: Router) {
    this.editPost = false;
    this.route.params.subscribe(params => {


      var post = <Post>this.router.getNavigatedData();
      if (post && Object.keys(post).length > 0) {

        this.editPost = true;
        if (post.attachments) {
          for (var i = 0; i < post.attachments.length; i++) {

            this.arrImg.push({
              name: post.attachments[i].name,
              url: post.attachments[i].url,
              type: post.attachments[i].type
            });
            this.addImg = true;
          }
        }


        if (typeof post.channel == 'number') {

          this.channel = <Channel>{
            id: 0,
            avatar: this.user.profile.avatar,
            name: this.user.profile.username,
          };
        }

        if (post.channel.id) {

          this.dataService.send({
            method: 'channels.get',
            session: this.user.profile.token,
            channel_id: post.channel.id
          }).then(data => {
            this.channel = <Channel>{
              id: post.channel.id,
              avatar: data['avatar'],
              name: data['name']
            };

          });

          this.pubicType = 1;
        }
        if (typeof post.channel == 'number') {

        }

        this.title = post.title;
        this.text = post.text;
        this.tags = typeof post.tags == 'object' ? post.tags : [];
        this.NSFW = post.nsfw;
        this.spoiler = post.spoiler;

        this._id = route.snapshot.params['id'];

      }


    });

  }

  setChannel(ch) {

    if (ch.id == 0) {
      this.channel = <Channel>{
        id: ch.id,
        avatar: this.user.profile.avatar,
        name: this.user.profile.username,
        subscribers: ch.count,
      };
    } else {
      this.channel = <Channel>{
        id: ch.id,
        avatar: ch.img,
        name: ch.name,
        subscribers: ch.count,
      };
    }
  }

  setFotoSetting(img) {
    this.settingFoto = img;

  }

  setFotoName(e) {
    this.settingFoto = e;
    this.settingFoto = new Object({});
  }

  backClicked() {

    // this._location.back();
  }

  setFiles(e) {
    var t = e.split(';')[0].split(':')[1].split('/')[0];

    this.arrImg.push({
      name: '',
      url: e.toString(),
      type: t
    });
  }

  onFileChanged(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {

      let filetype = event.target.files[i].split(';')[0].split(':')[1].split('/')[0];

      this.arrImg.push({
        name: '',
        url: event.target.files[i],
        type: filetype

      });

    }

  }

  ngOnInit() {


  }

  saveData() {

    this.text = this.text.slice(0, 800);
    this.tags = this.tags.splice(0, 5);
    var t = <Post>{
      channel: {id: (this.channel && this.channel.id ? this.channel.id : 0)},
      title: this.title,
      text: this.text,
      tags: this.tags,
      attachments: this.arrImg,
      spoiler: this.spoiler,
      nsfw: this.NSFW
    };

    if (this._id) {
      t['post_id'] = this._id;
    }
    this.dataService.send(Object.assign({method: 'posts.save', session: this.user.profile.token}, t)).then(data => {

      this.router.navigate(['/main']);


    }).catch(data => {

    });
    this.router.navigate(['/main']);
  }

  setfileArr(file) {


  }

}
