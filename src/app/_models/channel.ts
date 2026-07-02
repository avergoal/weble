export interface Channel {
  avatar: string
  id: number
  is_subscriber: boolean
  name: string
  description: string
  nsfw: number
  subscribers: number
  is_moderator:boolean
  title: string
  comments: number
  created_at: number
  is_owner: false
  oc: number
  owner: number
  posts: number
}
