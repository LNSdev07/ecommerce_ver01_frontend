import {Component, EventEmitter, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import * as url from "url";

@Component({
  selector: 'app-singer-avatar',
  templateUrl: './singer-avatar.component.html',
  styleUrls: ['./singer-avatar.component.scss']
})
export class SingerAvatarComponent {
  selectFile!: File;
  fileInFireBase!: AngularFireStorageReference
  urlFile!: string;
  @Output()
  urlFromFireBase = new EventEmitter<string>();
  constructor(private afService: AngularFireStorage) {
  }

  onChangeFile($event: Event) {
    console.log($event)
    // @ts-ignore
    this.selectFile = $event.target.files[0];
     console.log(this.selectFile)
  }

  upload(){
    this.fileInFireBase = this.afService.ref(this.selectFile.name);
    this.fileInFireBase.put(this.selectFile).then(data =>{
      return data.ref.getDownloadURL(); // tra ve 1 duong dan tu firebase
      // console.log(data.ref.getDownloadURL())
    }).then(url =>{
      this.urlFile = url;
      this.urlFromFireBase.emit(this.urlFile);
      return this.urlFile;
    }).catch(error =>{
      `upload file failed! ${error}`
    });
  }
}
