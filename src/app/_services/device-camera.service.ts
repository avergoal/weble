import { Injectable } from '@angular/core';
declare let cordova: any;
declare let navigator: any;
declare let window: any;
declare let Camera: any;
let device;
@Injectable({
  providedIn: 'root'
})
export class DeviceCameraService {
  photo
  constructor() {
  }
  cameraTakePicture2() {
    return new Promise((resolve, reject) => {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        correctOrientation:true,
        destinationType: Camera.DestinationType.DATA_URL
      });

      function onSuccess(imageData) {
        var image = new Image()
        image.src = "data:image/jpeg;base64," + imageData;
        resolve(image)
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

    })


  }
  cameraTakePicture() {
    console.log('camera set init');
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }
    return new Promise((resolve, reject) => {
      // alert('111')
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL
      });
      function onSuccess(imageData) {
        return resolve("data:image/jpeg;base64," + imageData);
      }

      function onFail(message) {
        return 'Failed because: ' + message
        ;
      }

    });




  }

}
