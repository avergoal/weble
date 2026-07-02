export interface User {
    token:string
    avatar: string
    email: string
    info: string
    phone: string
    sex: string
    username: string
    is_subscriber:boolean
    is_moderator:boolean
    settings:{
      lang:string
      feed:string
      nsfw:string
    }
    web: string
    id:any
    pm:any
    subscribers:any
    subscriptions:any
    posts:any
    created_at:number
}

export interface UserEdit {
    email: string
    info: string
    phone: string
    sex: string
    username: string
    web: string
}
