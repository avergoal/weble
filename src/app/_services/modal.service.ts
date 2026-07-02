import {EventEmitter, Injectable} from '@angular/core';

declare var $;
declare var window;

@Injectable({
    providedIn: 'root'
})


export class ModalService {
  createUsernameModal = {
    emit: new EventEmitter<any>(),
    view:false,
    type:'',
    data: {}
  }
  proofPostModal = {
    emit: new EventEmitter<any>(),
    view:false,
    type:'',
    data: {}
  }
  deletePostModal = {
    emit: new EventEmitter<any>(),
    view:false,
    type:'',
    data: {}
  }
  deleteCommentModal = {
    emit: new EventEmitter<any>(),
    view:false,
    type:'',
    data: {}
  }
  deleteModeratorModal = {
    emit: new EventEmitter<any>(),
    view:false,
    type:'',
    data: {}
  }
    viewPostType = {
        view:false,
        type:''
    }
  setLangModal = {
    view:false,
    type:''
  }
    errorModal = {
        view:false,
        type:'',
        timer : null,
        text:''
    }
  filterTimeModal = {
    view:false,
    type:'1',
    emit: new EventEmitter<any>()
  }
  swichAccountModal = {
    view:false,
    type:'',
  }
  postShareModal = {
    view:false,
    type:'',
  }
  reportModal = {
    type:'',
    id:'',
    view:false,

    callback:()=>{},
    send:function(id,type,callback=()=>{}){
      this.view = true
      this.type = type
      this.id = id,

      this.callback = callback
      },
    hide:function(){
      this.type = ''
      this.id = ''
      this.view = false
    },


  }
  subscribeModal = {
      view:false,
      data:null,
      type:false,
      callback:function(data){},
    subscribe:function(data,type,callback = function(){}){
        this.data = data
        this.type = type
        this.view = true
      this.callback = callback
    },
    hide:function(){
      this.data = null
      this.type = false
      this.view = false
      this.callback = function(data){}
    }
  }

    constructor() {


    }
    closeErrorModal(){
        this.errorModal.view = false
        this.errorModal.text = ''
      document.getElementsByTagName('body')[0].classList.remove("hidden_body");
        clearTimeout(this.errorModal.timer);
    }
    error(data){
        this.errorModal.text = data
        this.errorModal.view = true
        this.errorModal.timer = setTimeout(this.closeErrorModal.bind(this),3000)
        console.log(data)
    }
  shareViaAll(shareMessage,shareSubject,shareUrl,shareImg){

    window.plugins.socialsharing.share(
      shareMessage,
      '',
      '',
      shareUrl, // Link
      function( result ) {
        console.log('Success',result); }, // Success feedback
      function( result ) {
        console.log('Failed',result); }  // Error feedback
    );
  }
}
