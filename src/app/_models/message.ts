import {User} from './user';

export interface Message {
  id: string;
  new: boolean;
  text: string;
  status: number;
  created_at: number;
  unread: boolean;
  user: User;
}
export interface Dialog {
  avatars: string[];
  id: number;
  last_message: Message;
  new_messages: number;
  messages: Message[];
  title: string;
  type: number;
}

