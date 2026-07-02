import { Injectable } from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  mainPost = false
  hotListPost = false
  constructor(private dataService:DataService) {
    this.dataService.messages['EVENT/MainPost'].subscribe(data=>{
      this.mainPost = true
    })
    this.dataService.messages['EVENT/HotListPost'].subscribe(data=>{
      this.hotListPost = true
    })
  }
}
