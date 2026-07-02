import {Injectable, EventEmitter} from '@angular/core';

import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import {ModalService} from './modal.service';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';


declare var $;
declare var universalLinks;

export interface Message {
  method: string,
  data: any,
  requestId: number,
  //error:string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  dataStringSend = '';
  dataStringResp = '';
  USERS = {}
  locationHost = '';
  private message = <Message>{};
  ws: any;
  public TCP = false;
  public req = {};
  requestId: number = 0;
  wsRecconect: any;
  categories = [];
  HISTORY;
  messages = {}
  isReconnect = false
  device = Math.random().toString()

  constructor(private http: HttpClient, private mS: ModalService, public router: Router) {
    this.HISTORY = {
      history: ['/']
    };
    this.messages['EVENT/UserConnect'] = new EventEmitter()
    this.messages['EVENT/UserDisconnect'] = new EventEmitter()
    this.messages['EVENT/IncomingMessage'] = new EventEmitter()
    this.messages['EVENT/MainPost'] = new EventEmitter()
    this.messages['EVENT/HotListPost'] = new EventEmitter()
    this.connectWs()
    this.HISTORY['back'] = () => {
      this.HISTORY.history.splice(0, 1);
      this.router.navigate([this.HISTORY.history[0]]);
    };

    this.messages['EVENT/UserConnect'].subscribe(data=>{
      this.setGlobalUser({...data,online:true})
    })
    this.messages['EVENT/UserDisconnect'].subscribe(data=>{
      this.setGlobalUser({...data,online:false})

    })

    if (typeof universalLinks != 'undefined') {
      universalLinks.subscribe('ul_myExampleEvent', function (data) {

        this.router.navigate([data['path']]);

      }.bind(this));
    }

  }
  isOnline(id){
    if (this.USERS.hasOwnProperty(id)){
      return this.USERS[id].online
    }
    return false
  }

  setGlobalUser(user){
    if (user.hasOwnProperty('id')){
      if (this.USERS.hasOwnProperty(user.id)){
        console.log('update ADDDUSERRRRRRRRR');
        this.USERS[user.id] = {...user}
      } else {
        console.log('new ADDDUSERRRRRRRRR');
        this.USERS[user.id] = user
      }
    }
    console.log('this.userOnline[user.id]',this.USERS[user.id]);
  }
  connectWs() {
    var token = localStorage.getItem('token');
    let host = `weble.club`;
    // let host = `localhost`;
    // let host = `test.weble.club`;
    let port = `7005`;
    this.ws = io('https://'+host + ':' + port,{secure: true,forceNew:true });

    this.serviceWs();

  }
  serviceWs() {


    // if (token&&reconnect) {
    //   this.send({
    //     method:'users.auth',
    //     session: token
    //   }).then()
    // }
    this.ws.on('connect', function(){
      console.log('CONNECT!!!!!!!!!!!!!');
      if (this.isReconnect){
        var token = localStorage.getItem("token");
        if (token){
          this.send({
            method:'users.auth',
            session: token,
            device:this.device
          }).then(()=>{})
        }

      }

    }.bind(this));
    this.ws.on('message', function (data) {
      data = JSON.parse(data);
      console.log('RES wsSERVER ', data);
      if (data.error) {
        if (data.error.code) {
          this.mS.error(this.getOptionsFromId('errors', data.error.code).text);
        } else if (data.error.errorId) {
          this.mS.error(this.getOptionsFromId('errors', data.error.code).text);
        } else {
          this.mS.error(this.getOptionsFromId('errors', data.error.code).text);
        }

        if (!data.data) {
          return;
        }
      }
      if (data.hasOwnProperty('online')){
        data.online.map(id=>{
          this.setGlobalUser({id:id,online:true})
        })

      }
      if (this.req[data.requestId]) {
        this.req[data.requestId].emit(data.data);
      } else {
        let m = data.method.split('/');
        if (this.messages[m[1] + '/' + m[2]]) {
          this.messages[m[1] + '/' + m[2]].emit(data.data);
        } else {
          console.log('INCOMING MESS', data);
        }

      }

    }.bind(this));
    this.ws.on('error',(data) =>{
      console.log('ERORR CONNECT');
    })
    this.ws.on('disconnect',(data) =>{
      console.log('CLOSEEEEEEEEEEEe',this.ws.connected);
      this.isReconnect = true
      // this.wsRecconect = setInterval(()=> {
      //   this.connectWs();
      //   console.log('RECONNECT onclose');
      // }, 1000);
    })

  }

  declination(number = 0, titles) {
    let arr = [];
    switch (titles) {
      case 'subscriber':
        arr = ['subscriber._0', 'subscriber._1', 'subscriber._2'];
        break;
      case 'publication':
        arr = ['publication._0', 'publication._1', 'publication._2'];
        break;
      case 'subscription':
        arr = ['subscription._0', 'subscription._1', 'subscription._2'];
        break;
    }
    let cases = [2, 0, 1, 1, 1, 2];
    return arr[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

  }

  convertModelToFormData(model: any, form: FormData = null, namespace = ''): FormData {
    let formData = form || new FormData();
    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || model[propertyName] == undefined) {
        continue;
      }
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Date) {
        formData.append(formKey, model[propertyName]);
      } else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element, index) => {
          if (typeof element != 'object') {
            formData.append(`${formKey}[]`, element);
          } else {
            const tempFormKey = `${formKey}[${index}]`;
            this.convertModelToFormData(element, formData, tempFormKey);
          }
        });
      } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {

        this.convertModelToFormData(model[propertyName], formData, formKey);
      } else if (typeof model[propertyName] === 'object' && (model[propertyName] instanceof File)) {
        formData.append(formKey, model[propertyName], 'asdasdasd.jpg');
        console.log('formKey--', formKey, model[propertyName] instanceof File);
      } else {

        formData.append(formKey, model[propertyName].toString());
      }
    }
    return formData;
  }

  sendws(method: string, data: any, server?: string) {
    if (!server) {
      server = 'worker';
    }

    this.requestId++;
    this.message = <Message>{
      method:method,
      data: data,
      error: null,
      requestId: this.requestId
    };
    console.log('SEND wsSERVER ', this.message);
    this.req[this.requestId] = new EventEmitter();
    this.ws.send(JSON.stringify(this.message));
    return new Promise((resolve, reject) => {
      this.req[this.requestId].subscribe((data) => {
        return resolve(data);
      });
    });
  }

  send(data, url = null, dataType = 'json', responseType = null) {
  if (this.TCP||true){
    return this.sendws(data['method'],data)
  }
    return new Promise((resolve, reject) => {

      var fd = new FormData();
      fd = this.convertModelToFormData(data, fd);
      this.dataStringSend = JSON.stringify(data);
      console.log('SEND', data);
      url = false;
      this.http.post(url ? url : 'https://weble.club/api/', fd)
        .subscribe(resp => {
          this.dataStringResp = JSON.stringify(resp);
          this.locationHost = window.location.host;
          if (resp.hasOwnProperty('response') && !resp['response'].hasOwnProperty('error')) {
            resolve(resp['response']);
          } else if (resp.hasOwnProperty('response') && resp['response'].hasOwnProperty('error')) {
            switch (resp['response'].error) {
              case 2:
                localStorage.removeItem('token');
                localStorage.removeItem('profile');
                this.router.navigate(['/main']);
                break;
              default:
                this.mS.error(resp['response'].error);
            }
            reject(resp['response']);
          } else {
            // throw new Error(data)
          }
          console.info('RESP', resp);
        });


    });

  }


}
