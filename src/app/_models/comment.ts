import {User} from './user';
import {Post} from './post';
import {Channel} from './channel';

export interface Comment {
  user:User,
  id: number,
  pid: number,
  text: string,
  time: number,
  created_at: number,
  rating: number,
  thread_count:number
  thread_offset:number
  thread_comments: Comment[],
}
export interface ProfileComment {
  channel: Channel
  created_at: number
  id: number
  pid: number
  post: Post
  user:User
  text: string
  sharing:number
  like:number
  dislike:number
}
