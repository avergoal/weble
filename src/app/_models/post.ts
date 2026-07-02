import {User} from './user';
import {Channel} from './channel';

export interface Post {
  user:User,
  attachments: Attachments[],
  avatar: string,
  link: any,
  id: string,
  nsfw: number,
  oc: number,
  myrating: number,
  share_url:string
  spoiler: number,
  body: any,
  tags: string[],
  text: string,
  created_at: number,
  title: string,
  comments: number,
  minus: number,
  plus: number,
  rating: number
  channel:Channel
}
export interface Attachments {
  name:string
  url:string
  type:string
}
export interface Link {
  iframe:string
  url:string
  type:string
}
