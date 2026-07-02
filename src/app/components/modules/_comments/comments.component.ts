import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HelpersService} from "../../../_services/helpers.service";
import {DataService} from "../../../_services/data.service";
import {UserService} from "../../../_services/user.service";
import {ModalService} from '../../../_services/modal.service';
import {Post} from '../../../_models/post';
import {User} from '../../../_models/user';
import {Comment} from '../../../_models/comment';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input() post: Post;
  @ViewChild('textArea', { read: ElementRef }) textArea: ElementRef;
  parseInt = parseInt
    answerModel:Comment = null
    comment_text
    comments_arr:Comment[] = []
  limit = 5
  skip = 0
  last_id = -1
  offset = -1
    constructor(public help:HelpersService,private dataService:DataService,public user:UserService,public mS:ModalService) {

    }
  setMod(ss){
    let show = true
    if (ss.classList.contains("active")){
      show = false
    }


    let y = document.getElementsByClassName('three_points')
    for (var i = 0; i < y.length; i++) {
      y[i].classList.remove('active')
    }
    if (show){
      ss.classList.add("active");
    }
  }
  setModHide(){

    let y = document.getElementsByClassName('three_points')
    for (var i = 0; i < y.length; i++) {
      y[i].classList.remove('active')
    }
  }
  reportcomment(id){
  this.mS.reportModal.send(id,'comments',()=>{

  })
}

  public autoGrow() {
    const textArea = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
    var el = document.getElementsByClassName('center_edges');

    el[el.length-1].scrollIntoView(true)
  }
  scrollBot(){
    setTimeout(()=>{



    },1);
  }
  deleteThreadComments(comment,thread_comments){
    comment.thread_comments.splice(1,comment.thread_comments.length-1)
  }
  deleteComments(comment:Comment,th,index){

    this.mS.deleteCommentModal.view = true;
    this.mS.deleteCommentModal.data = Object.assign({comment:comment},{th:th},{index:index});
    this.mS.deleteCommentModal.emit.subscribe(data=>{

      if (th&&th.id&&data){
        comment.thread_comments.splice(index,1)
      }else{
        this.comments_arr.splice(index,1)
      }

    });


    document.getElementsByTagName('body')[0].classList.add('hidden_body');






  }

  uploadThreadComments(comment:Comment){
    if (comment.thread_comments.length>0){
      this.offset = comment.thread_comments[comment.thread_comments.length-1].id
    }
    this.dataService.send({
      method:'comments.thread',
      session:this.user.profile.token,
      post_id:this.post.id,
      thread_id:comment.id,
      offset:this.offset,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{
      comment.thread_comments = comment.thread_comments.concat(data['data'])
      this.offset = parseInt(data['offset'])
    }).catch(data=>{
      console.log('ERR',data)
    })
  }
  getThreadComments(comment:Comment){
    return

    this.dataService.send({
      method:'comments.thread',
      session:this.user.profile.token,
      post_id:this.post.id,
      thread_id:comment.id,
      offset:-1,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{
      comment.thread_comments = comment.thread_comments.concat(data['data'])
    }).catch(data=>{

    })
  }
  getComments(){
    if (this.limit==0){return;}
    this.dataService.send({
      method:'posts.comments',
      session:this.user.profile.token,
      post_id:this.post.id,
      offset:this.last_id,
      skip:this.skip,
      limit:this.limit
    }).then(data=>{
      if ((<Comment[]>data['data']).length<this.limit){
        this.limit=0
      }
      this.skip+=this.limit

      this.comments_arr = this.comments_arr.concat(data['data'])
      if (this.comments_arr.length>0){
        this.last_id = this.comments_arr[this.comments_arr.length-1].id
      }
    }).catch(data=>{

    })
  }
    ngOnInit() {

         this.getComments()
    }
  answerComment(comment,th=null){
    this.answerModel = Object.assign({},<Comment>comment)

    if (th!==null){
      this.answerModel.user =  Object.assign({},th.user)

    }

  }
    setComment(){

      let q = {
        method:'comments.save',
        session:this.user.profile.token,
        post_id:this.post.id,
        text:this.comment_text
      }
      if (this.answerModel){
        q['thread_id'] = this.answerModel.id
      }

        this.dataService.send(q).then(data=>{
          var t = <Comment>{
            id: data['id'],
            text: this.comment_text+'',
            created_at: (+ new Date()/1000),
            user:<User>{
              id: this.user.profile.id,
              avatar: this.user.profile.avatar,
              username: this.user.profile.username
            }

          }

          if (this.answerModel){
            for (var i = 0; i < this.comments_arr.length; i++) {
              if (this.comments_arr[i].id==this.answerModel.id){
                if (!this.comments_arr[i].thread_comments){
                  this.comments_arr[i].thread_comments = <Comment[]>[]
                }
                this.comments_arr[i].thread_comments.push(t)

              }

            }

            let ID = this.answerModel.id
            setTimeout(function(){
              var el = document.getElementsByClassName('comments_2_'+ID);

              el[el.length-1].scrollIntoView({block: "center", inline: "nearest"})
            }.bind(this),100)

          }else{
            this.comments_arr.unshift(t)


          }

          this.answerModel = null
          if (!this.answerModel){
            // setTimeout(function(){window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)},15)
          }

          this.comment_text = ''
        }).catch(data=>{

      })
    }
    like(comment_id){


        this.dataService.send({
            method:'comments.like',
            session:this.user.profile.token,
            comment_id:comment_id
        }).then(data=>{

            // if (this.post.stats.plus-this.post.stats.minus!=data['rating']){
            //     this.post.stats.plus++;
            //     // this.post.stats.plus==0?this.post.stats.plus=1:null
            // }
        })
    }
    dislike(comment_id){

        this.dataService.send({
            method:'comments.dislike',
            session:this.user.profile.token,
          comment_id:comment_id
        }).then(data=>{
            // if (this.post.stats.plus-this.post.stats.minus!=data['rating']){
            //     this.post.stats.minus++
            //     // this.post.stats.minus==0?this.post.stats.minus=1:null
            // }
        })
    }

    getTags(str){
        return str.split(',');
    }

}
