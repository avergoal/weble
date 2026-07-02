import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceCameraService} from '../../../_services/device-camera.service';
import {catchError} from 'rxjs/operators';
import {ImageService} from '../../../_services/image.service';


declare var EXIF: any;
declare var navigator: any;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() type:any = [1,2,3]
  @Output('photo') photo = new EventEmitter<any>();
  pictureSource
  destinationType
  @Output('error') error = new EventEmitter<any>();
  ngOnChanges(changes: any) {
    console.log("changes.show",changes.show);
    if (changes.show&&changes.show.currentValue){
      document.getElementsByTagName('body')[0].classList.add("hidden_body");
    }
    if (changes.show&&changes.show.currentValue==false){
      document.getElementsByTagName('body')[0].classList.remove("hidden_body");
    }
  }
  constructor(public cameraService:DeviceCameraService) { }
  l = window.location.host
  ngOnInit() {
    if (navigator&&navigator.camera){
      this.pictureSource=navigator.camera.PictureSourceType;
      this.destinationType=navigator.camera.DestinationType;
    }

  }
  getPhoto(){
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50,
      destinationType: this.destinationType.FILE_URI,
      sourceType: this.pictureSource.PHOTOLIBRARY });
  }
  onPhotoURISuccess(imageURI){
    alert(imageURI)
    this.photo.emit(imageURI)
  }
  onFail(message) {
    alert('Failed because: ' + message);
  }
  onFileChanged(event: any) {

    this.photo.emit(event.target.files[0]);

  }
  deleteFoto(){
    this.photo.emit('')
  }
  cameraTakePicture(){
    let self = this
    this.cameraService.cameraTakePicture().then((data)=>{

      self.photo.emit(data.toString())




    }).catch(data=>{
      this.error.emit(data)
    })
  }
  setfileArr(e){

  }
  checkFiles(files){

    for(let i=0;i<files.length;i++){

      this.uploadFile(files[i])
    }
  }
  parsefiles(event){
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files2: FileList = target.files;
    return files2
  }
  uploadFile(file){

    var reader = new FileReader();
    reader.onload = function (event) {

      file.resizeFile = event.target.result;

      if (file.size>10000000){
        alert("The files are too big for the system.")
      }else{
        this.resizeUpload(file, 400, 400);
      }


    }.bind(this)
    reader.readAsDataURL(file)
  }
  resizeUpload(file,width, height) {
    this.photo.emit(file.resizeFile)



  }
  imageToDataUri(img, width, height,exif) {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
    var iw = img.width;
    var ih = img.height;

    ctx.transform(0, 1, -1, 0, ih, 0);

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var t = canvas.toDataURL('image/jpeg', 1);

    return t
  }

}
