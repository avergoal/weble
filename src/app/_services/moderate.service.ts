import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModerateService {
  modposts = []
  notifyArr = []
  activeModCh_id = null
  constructor() { }
}
