import {Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {HelpersService} from '../../../_services/helpers.service';
import {DataService} from '../../../_services/data.service';
import {UserService} from '../../../_services/user.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../_services/modal.service';
import {Post} from '../../../_models/post';
import {Location} from '@angular/common';
import * as M from '../../../../assets/materialize/js/materialize.js';
import {DomSanitizer} from '@angular/platform-browser';
import {forEach} from '@angular/router/src/utils/collection';


declare let $: any;
declare let pinchToZoom: any;
declare let navigator: any;
declare let cordova: any;
declare let Swiper: any;

@Component({
    selector: 'app-post-view',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostViewComponent implements OnInit {
    eventClickImg = false;
    dviwe = false;
    @Input() post: Post;
    @Input() type;
    @Input() comments = false;
    @Input() moderate = false;
    comment_text;
    comments_arr = [];
    iabRef = null;
    h = 0;
    activMod;
    postContainer;
    @ViewChild('post_middle_img img') elementView: ElementRef;

    constructor(
        private sanitizer: DomSanitizer,
        private _location: Location,
        public help: HelpersService,
        private dataService: DataService,
        public user: UserService,
        public mS: ModalService,
        private router: Router) {


    }

    ngAfterViewInit() {


        // var elems = document.querySelectorAll('.carousel');
        // var instances = M.Carousel.init(elems, this.options);
        if (this.post.attachments && this.post.attachments.length > 1) {
            var swiper = new Swiper('.' + this.postContainer, {
                pagination: {
                    el: '.pagination' + this.postContainer,
                },
            });
        }


        let y = document.getElementsByClassName('imsourse');
        for (var i = 0; i < y.length; i++) {
            new pinchToZoom.PinchToZoom(y[i]);

        }

    }

    setMod(ss) {
        let show = true;
        if (ss.classList.contains('active')) {
            show = false;
        }


        let y = document.getElementsByClassName('three_points');
        for (var i = 0; i < y.length; i++) {
            y[i].classList.remove('active');
        }
        if (show) {
            ss.classList.add('active');
        }


    }

    setModHide() {

        let y = document.getElementsByClassName('three_points');
        for (var i = 0; i < y.length; i++) {
            y[i].classList.remove('active');
        }
    }

    reportpost() {

        this.mS.reportModal.send(this.post.id, 'post', () => {

        });
    }

    blureimg(e, ll) {
        console.log('dddddddd', e);
        // console.log(ll);
        new pinchToZoom.PinchToZoom(e);

        if (ll.classList.contains('blur')) {
            ll.classList.remove('blur');
        }
        if (ll.classList.contains('active')) {
            ll.classList.remove('active');
        } else {
            ll.classList.add('active');
        }

    }

    hidepost() {


        alert('NOT METHOD');
    }

    scrollEll(e) {

    }

    editpost() {

        this.router.navigateByData({url: ['/create_new_post', this.post.id], data: this.post});

    }

    Approve(val) {
        this.mS.proofPostModal.view = true;
        this.mS.proofPostModal.data = {val: val, id: this.post.id};
        this.mS.proofPostModal.emit.subscribe(data => {
            if (data) {
                delete this.post;
            }
        });

    }

    deletepost() {
        this.mS.deletePostModal.view = true;
        this.mS.deletePostModal.data = this.post;
        this.mS.deletePostModal.emit.subscribe(data => {
            if (data) {
                delete this.post;
            }


        });


        document.getElementsByTagName('body')[0].classList.add('hidden_body');


    }

    title = 'app';
    options = {
        fullWidth: true,
        noWrap: true,
        duration: 150,
        onCycleTo: function (data) {
            var y = data.getAttribute('id').split('_')[1];

            if (document.getElementsByClassName('img_' + y)) {
                for (var i = 0; i < document.getElementsByClassName('img_' + y).length; i++) {
                    document.getElementsByClassName('img_' + y)[i].classList.remove('active-circle');
                }
                if (document.getElementsByClassName('img_' + y)[this.center]) {
                    document.getElementsByClassName('img_' + y)[this.center].classList.add('active-circle');
                }


            }


        }
    };

    openLink(url) {
        this.iabRef = cordova.InAppBrowser.open(url, '_blank', 'location=yes,hardwareback=yes');
    }

    iabClose(event) {
        console.log('CLOSE EVENT');
        this.iabRef.removeEventListener('exit', this.iabClose);
    }

    ngOnInit() {

        //this.post.link.iframe = '<iframe src="https://stackoverflow.com/questions/52668361/ionic-4-cordova-cordova-plugin-facebook4-property-provide-is-missing-in-type">ssssssssssssssssssssssssssssssssssssss</iframe>';
        if (this.post && this.post.link && this.post.link.iframe) {
            this.post.link.iframe = this.sanitizer.bypassSecurityTrustHtml(this.post.link.iframe);
        }
        if (this.post) {
            if (this.post.tags && typeof this.post.tags == 'object') {
                this.post.tags = this.post.tags;
            } else {
                this.post.tags = [];
            }

        }

        if (this.post.attachments && this.post.attachments.length > 1) {
            this.postContainer = `swiper-container_${this.post.id}`;

        }
    }

    like(post_id) {
        if (!this.user.profile || !this.user.profile.token) {
            this.router.navigate(['/join']);
            return;
        }

        this.dataService.send({
            method: 'posts.like',
            session: this.user.profile.token,
            post_id: post_id
        }).then(data => {
            if (this.post.myrating == 1) {
                this.post.myrating = 0;
            } else if (this.post.myrating == 0) {
                this.post.myrating = 1;
            } else if (this.post.myrating == -1) {
                this.post.myrating = 1;
            }
            this.post.rating = data['rating'];
        });
    }

    dislike(post_id) {
        if (!this.user.profile || !this.user.profile.token) {
            this.router.navigate(['/join']);
            return;
        }
        this.dataService.send({
            method: 'posts.dislike',
            session: this.user.profile.token,
            post_id: post_id
        }).then(data => {
            if (this.post.myrating == 1) {
                this.post.myrating = -1;
            } else if (this.post.myrating == 0) {
                this.post.myrating = -1;
            } else if (this.post.myrating == -1) {
                this.post.myrating = 0;
            }
            this.post.rating = data['rating'];
        });
    }


    getTags(str) {
        return str.split(',');
    }

    closeImg() {
        this.eventClickImg = false;
        this.dviwe = false;
        document.getElementsByTagName('body').item(0).classList.remove('no-scroll-img');
        document.getElementsByClassName('footer_weble').item(0).classList.remove('hidden');
        // for (let i = 0; i < document.getElementsByClassName('wrap-post').length; i++) {
        //     document.getElementsByClassName('wrap-post').item(i).classList.remove('remove');
        //     document.getElementsByClassName('wrap-post').item(i).classList.remove('active');
        // }
    }

    clickImg(id) {
        // document.getElementById('post_id_'+id).classList.add('active');
        document.getElementsByClassName('footer_weble').item(0).classList.add('hidden');
        document.getElementsByTagName('body').item(0).classList.add('no-scroll-img');
        // for (let i = 0; i < document.getElementsByClassName('wrap-post').length; i++) {
        //     document.getElementsByClassName('wrap-post').item(i).classList.add('remove');
        // }
        // document.getElementById(id).classList.remove('remove');
        if (this.eventClickImg && !this.dviwe) {
            this.dviwe = true;
        } else if (this.eventClickImg && this.dviwe) {
            this.dviwe = false;
        }
        this.eventClickImg = true;


    }

}

