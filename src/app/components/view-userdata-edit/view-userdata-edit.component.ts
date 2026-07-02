import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User, UserEdit} from '../../_models/user';
import {ImageService} from '../../_services/image.service';
import {Location} from '@angular/common';
import {AuthService} from '../../_services/auth.service';
import {ModalService} from '../../_services/modal.service';
import {DataService} from 'src/app/_services/data.service';
import {Router} from '@angular/router';

declare let cordova: any;
declare let navigator: any;
declare let window: any;
declare let Camera: any;
let device;

@Component({
    selector: 'app-view-userdata-edit',
    templateUrl: './view-userdata-edit.component.html',
    styleUrls: ['./view-userdata-edit.component.scss']
})
export class ViewUserdataEditComponent implements OnInit {
    userEdit = <UserEdit>{};
    srcuu;
  uploadAvatar =false;
  error = '';
  log = '';
  avatar
  filesVav

    constructor(public _location: Location,public user: UserService,public imageService:ImageService,public aS:AuthService,public mS:ModalService,private dS:DataService, public router: Router) {
        this.userEdit = <UserEdit>{
            username: user.profile.username,
            sex: user.profile.sex,
            email: user.profile.email,
            info: user.profile.info,
            phone: user.profile.phone,
            web: user.profile.web,
            actualPass:'',
            pass1:'',
            pass2:'',
        };

    }


   b64toBlob(b64Data, contentType = '', sliceSize = 256) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = window.atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
    saveData() {

        this.user.editUserData(this.userEdit);

      this.router.navigate(['/view_userdata']);
    }
  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  setsdsd(e){

    this.dS.send({
      method: 'users.avatar.save',
      session: this.user.profile.token,
      avatar:this.b64toBlob("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAA")
    },'http://192.168.102.231').then(res => {
      // this.user.profile.avatar = res['url']
      this.log = JSON.stringify(res)


    }).catch(data => {
      this.log = JSON.stringify(data)

    });
  }

  setAvatar(e){
    var t = e
    this.user.profile.avatar = e
    this.dS.send({
      method: 'users.avatar.save',
      session: this.user.profile.token,
      avatar:t,
      delete:t==''?true:false
    }).then(res => {
      this.user.profile.avatar = res['url']
     this.log = JSON.stringify(res)


    }).catch(data => {
      this.log = JSON.stringify(data)

    });
  }

    ngOnInit() {

    }

}
