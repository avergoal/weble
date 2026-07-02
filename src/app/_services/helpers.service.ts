import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    constructor(public translate: TranslateService) {
    }

    getUnixTimestamp() {
        return Math.round(new Date().getTime() / 1000);
    }

  hurSecondFormat(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    let min = a.getMinutes();
    let sH = ''+hour
    let sM = ''+min
    if (hour<10){sH = '0'+hour}
    if (min<10){sM = '0'+min}
    let time = sH + ':' + sM;
    return time;
  }
    timeOutGenerate(UNIX_timestamp){
        let a = parseInt(UNIX_timestamp);
        let b = this.getUnixTimestamp();


        let diff = b-a
        diff<0?diff=0:null
        switch (true) {
            case (diff<3600):
              if (Math.floor(diff/60)==0){
                return this.translate.get('back.now')['value']
              }else if (Math.floor(diff/60)>0&&Math.floor(diff/60)<60) {
                return Math.floor(diff/60)+' '+this.translate.get('back.min')['value']
              }

            break;
            case (diff<3600*24):
                return Math.floor(diff/60/60) +' '+this.translate.get('back.hour')['value']
                break;
            case (diff>3600*24&&diff<3600*48):
                return ' '+this.translate.get('back.yest')['value']
                break;
            case (diff>3600*48&&diff<3600*24*30):
                return Math.floor(diff/60/60/24) +' '+this.translate.get('back.day')['value']
                break;
            case (diff>3600*24*30&&diff<3600*24*365):
                return Math.floor(diff/60/60/24/30) +' '+this.translate.get('back.month')['value']
                break;
            default:
                return ''
                break;

        }
    }
  ddmmyyyyHHmmFormat(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = [
            'mon.Jan',
            'mon.Feb',
            'mon.Mar',
            'mon.Apr',
            'mon.May',
            'mon.Jun',
            'mon.Jul',
            'mon.Aug',
            'mon.Sep',
            'mon.Oct',
            'mon.Nov',
            'mon.Dec'
        ];
        let year = a.getFullYear();
        let month = this.translate.get(months[a.getMonth()])['value'];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
        return time;
    }
}
