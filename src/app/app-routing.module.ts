import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotListComponent} from './components/hot-list/hot-list.component';

import {ViewModalCreateComponent} from './components/view-modal-create/view-modal-create.component';
import {ViewDialogsComponent} from './components/view-dialogs/view-dialogs.component';
import {ViewUserdataComponent} from './components/view-userdata/view-userdata.component';
import {ViewUserdataEditComponent} from './components/view-userdata-edit/view-userdata-edit.component';
import {ProfileComponent} from './components/profile/profile.component';

import {AuthLoginComponent} from './components/auth/auth-login/auth-login.component';
import {AuthRegComponent} from './components/auth/auth-reg/auth-reg.component';
import {AuthRemindComponent} from './components/auth/auth-remind/auth-remind.component';
import {MainComponent} from './components/main/main';
import {PostDetailComponent} from './components/modules/post-detail/post-detail';
import {SubscribersComponent} from './components/subscribers/subscribers';
import {SubscriptionsComponent} from './components/subscriptions/subscriptions';
import {SearchChennelComponent} from './components/search-chennel/search-chennel.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {CreateNewChannelComponent} from './components/create-new-channel/create-new-channel.component';
import {ChannelDetailComponent} from './components/channel-detail/channel-detail.component';
import {SecurityComponent} from './components/security/security.component';
import {NotificationComponent} from './components/notification/notification.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {RejectFormComponent} from './components/modals/reject-form/reject-form.component';
import {ChannelsCategoryComponent} from './components/channels-category/channels-category.component';
import {CreateGroupChatComponent} from './components/create-group-chat/create-group-chat.component';
import {GroupChatInfoComponent} from './components/group-chat-info/group-chat-info.component';
import {StartScreenComponent} from './components/auth/start-screen/start-screen.component';
import {JoinComponent} from './components/join/join.component';
import {TagsViweComponent} from './components/tags-viwe/tags-viwe.component';

const routes: Routes = [
    // {path:'', component:StartScreenComponent},
    {path:'', component:HotListComponent},

    {path:'join', component:JoinComponent},
    {path:'main', component:MainComponent, },
    {path:'hotlist', component:HotListComponent},
    {path:'search_chennel', component:SearchChennelComponent},
    {path:'create_new_post', component:ViewModalCreateComponent},
    {path:'create_new_post/:id', component:ViewModalCreateComponent},
    {path:'view_dialogs', component:ViewDialogsComponent},
    {path:'view_userdata', component:ViewUserdataComponent},
    {path:'view_userdata_edit', component:ViewUserdataEditComponent},
    {path:'main-popular', component:HotListComponent},
    {path:'profile', component:ProfileComponent},
    //
    {path:'login', component:AuthLoginComponent},
    {path:'register', component:AuthRegComponent},
    {path:'remind', component:AuthRemindComponent},
    {path:'post-detail/:id', component:PostDetailComponent},
    {path:'post_detail/:id', component:PostDetailComponent},
    {path:'p/:id', component:PostDetailComponent},
    {path:'subscribers', component:SubscribersComponent},
    {path:'subscriptions', component:SubscriptionsComponent},
    {path:'user-profile/:id', component:UserProfileComponent},
    {path:'create-new-channel', component:CreateNewChannelComponent},
    {path:'channel_viwe/:id', component:ChannelDetailComponent},
    {path:'tags_viwe/:id', component:TagsViweComponent},
    {path:'security', component:SecurityComponent},
    {path:'notification', component:NotificationComponent},
    {path:'channels-category/:id', component:ChannelsCategoryComponent},
    {path:'dialog/:id', component:DialogComponent},
    {path:'RejectFormComponent', component:RejectFormComponent},
    {path:'create_group_chat', component:CreateGroupChatComponent},
    {path:'group_chat_info_r', component:GroupChatInfoComponent},


    {path:'**', component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
