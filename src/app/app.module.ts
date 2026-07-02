import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/modules/post-list/post-list.component';
import { FooterComponent } from './components/modules/footer/footer.component';
import { HotListComponent } from './components/hot-list/hot-list.component';

import { SearchChennelComponent } from './components/search-chennel/search-chennel.component';
import { ViewModalCreateComponent } from './components/view-modal-create/view-modal-create.component';
import { ViewDialogsComponent } from './components/view-dialogs/view-dialogs.component';
import { ViewUserdataComponent } from './components/view-userdata/view-userdata.component';
import { ViewUserdataEditComponent } from './components/view-userdata-edit/view-userdata-edit.component';
import { AuthLoginComponent } from './components/auth/auth-login/auth-login.component';
import {DataService} from './_services/data.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {UserService} from './_services/user.service';
import { ProfileComponent } from './components/profile/profile.component';

import {APP_BASE_HREF} from '@angular/common';
import {AuthRegComponent} from './components/auth/auth-reg/auth-reg.component';
import {AuthRemindComponent} from './components/auth/auth-remind/auth-remind.component';
import {MainComponent} from './components/main/main';
import {MainHeadComponent} from './components/modules/main-head/main-head';
import {PostViewComponent} from './components/modules/_post/post.component';
import {ModalService} from './_services/modal.service';
import {ViewPostTypeModal} from './components/modals/view-post-type/view-post-type';
import {PostDetailComponent} from './components/modules/post-detail/post-detail';
import {CommentsComponent} from './components/modules/_comments/comments.component';
import {ErorMessageModal} from './components/modals/error-message/error-message';
import {SubscribersComponent} from './components/subscribers/subscribers';
import {SubscriptionsComponent} from './components/subscriptions/subscriptions';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {ShortListComponent} from './components/modules/short-list/short-list.component';
import { UploadFileComponent } from './components/modals/upload-file/upload-file.component';
import {DeviceCameraService} from './_services/device-camera.service';
import {SearchChannelModuleComponent} from './components/modules/search-channel-module/search-channel-module.component';
import { PersComentComponent } from './components/modules/pers-coment/pers-coment.component';
import { PersNotifyComponent } from './components/modules/pers-notify/pers-notify.component';
import { CreateNewChannelComponent } from './components/create-new-channel/create-new-channel.component';
import { ChannelDetailComponent } from './components/channel-detail/channel-detail.component';
import { SecurityComponent } from './components/security/security.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SwichAccountComponent } from './components/modals/swich-account/swich-account.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PostShareComponent } from './components/modals/post-share/post-share.component';
import { RejectFormComponent } from './components/modals/reject-form/reject-form.component';
import 'angular2-navigate-with-data';
import { SubscribeModalComponent } from './components/modals/subscribe-modal/subscribe-modal.component';
import { UserCommentsComponent } from './components/modules/user-comments/user-comments.component';
import { ModeratorsListComponent } from './components/moderators-list/moderators-list.component';
import { ChannelRulesComponent } from './components/channel-rules/channel-rules.component';
import { ReportModalComponent } from './components/modals/report-modal/report-modal.component';
import { FilterTimeModalComponent } from './components/modals/filter-time-modal/filter-time-modal.component';
import { ChannelsCategoryComponent } from './components/channels-category/channels-category.component';
import { CreateGroupChatComponent } from './components/create-group-chat/create-group-chat.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { SetLangAppComponent } from './components/modals/set-lang-app/set-lang-app.component';
import { CreateHashTagsComponent } from './components/modals/create-hash-tags/create-hash-tags.component';
import { SetSetingFotoComponent } from './components/modals/set-seting-foto/set-seting-foto.component';
import { GroupChatInfoComponent } from './components/group-chat-info/group-chat-info.component';
import { StartScreenComponent } from './components/auth/start-screen/start-screen.component';
import { JoinComponent } from './components/join/join.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DeletePostComponent } from './components/modals/delete-post/delete-post.component';
import { TagsViweComponent } from './components/tags-viwe/tags-viwe.component';
import {ModerateService} from './_services/moderate.service';
import { ProofPostComponent } from './components/modals/proof-post/proof-post.component';
import { ClickOutsideModule } from 'ng-click-outside';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  VkontakteLoginProvider,

} from 'angular-6-social-login-v2';
import {CreateUsernameModal} from './components/modals/create-username/create-username';
import { DeleteModeratorComponent } from './components/modals/delete-moderator/delete-moderator.component';
import { DeleteCommentComponent } from './components/modals/delete-comment/delete-comment.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { NewpostComponent } from './components/modals/newpost/newpost.component';

export function HttpLoaderFactory(httpss) {

  return new TranslateHttpLoader(httpss, './assets/i18n/', '.json');
}
// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2295864913971676')
      },
    ]
);
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    FooterComponent,
    HotListComponent,

    SearchChennelComponent,
    ViewModalCreateComponent,
    ViewDialogsComponent,
    ViewUserdataComponent,
    ViewUserdataEditComponent,
    AuthLoginComponent,
    AuthRemindComponent,
    AuthRegComponent,

    ProfileComponent,
    MainComponent,
    ErorMessageModal,


    MainHeadComponent,
    PostViewComponent,
    PostDetailComponent,

    ViewPostTypeModal,
    CommentsComponent,
    SubscribersComponent,
    SubscriptionsComponent,

    UserProfileComponent,
    ShortListComponent,
    UploadFileComponent,
    SearchChannelModuleComponent,
    PersComentComponent,
    PersNotifyComponent,
    CreateNewChannelComponent,
    ChannelDetailComponent,
    SecurityComponent,
    NotificationComponent,
    SwichAccountComponent,
    DialogComponent,
    PostShareComponent,
    RejectFormComponent,
    SubscribeModalComponent,
    UserCommentsComponent,
    ModeratorsListComponent,
    ChannelRulesComponent,
    ReportModalComponent,
    FilterTimeModalComponent,
    ChannelsCategoryComponent,
    CreateGroupChatComponent,
    SetLangAppComponent,
    CreateHashTagsComponent,
    SetSetingFotoComponent,
    GroupChatInfoComponent,
    StartScreenComponent,
    JoinComponent,
    DeletePostComponent,
    TagsViweComponent,
    ProofPostComponent,
    CreateUsernameModal,
    DeleteModeratorComponent,
    DeleteCommentComponent,
    NewpostComponent,






  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    AppRoutingModule,
    SocialLoginModule,

    PinchZoomModule,

      HttpClientModule,
      FormsModule,
    ClickOutsideModule,


    TranslateModule.forRoot({
      loader: {
        provide:    TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:       [HttpClient]
      }
    }),
      ReactiveFormsModule
  ],
  providers: [
      DataService,
      UserService,

    ModalService,
    ModerateService,

    DeviceCameraService,
    {provide: APP_BASE_HREF, useValue : '/' },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }

  ],
    exports:      [],
    schemas:      [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
