import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
    arrImg = []
  constructor() { }

    upload(e){
        var files = this.parsefiles(e)
        var a = []
        if (files.length==1){
            a.push(files)
        }
        return new Promise(function(resolve, reject) {


            for (var i=0;i<files.length;i++){
                this.uploadFile(files[i],resolve,files.length)
            }
        }.bind(this))


    }
    parsefiles(event){
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files2: FileList = target.files;
        return files2
    }

    uploadFile(file,resolve,max){

        var reader = new FileReader();
        reader.onload = function (event) {
            file.resizeFile = event.target.result;

            var img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = function () {
                var resize = this.imageToDataUri(img, 400, 400);
                file.resizeFile = resize;

                file.mimeType = 'image/png';
                // file = Object.assign({},file)
                this.arrImg.push(file)
                if (max==this.arrImg.length){
                    resolve(this.arrImg)
                }
            }.bind(this);
        }.bind(this)
        reader.readAsDataURL(file)
    }


    imageToDataUri(img, width, height) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((400 / iw), (400 / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;

        canvas.width = iwScaled;
        canvas.height = ihScaled;
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        var t = canvas.toDataURL('image/png', 1);

        return t
    }

}
