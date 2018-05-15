import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class UploadFileService{
    constructor(
        private http:Http,
        public uploader:FileUploader
    ) { }
    
    uploadFile(){
        this.uploader = new FileUploader({url:'http://localhost:3000/upload/upload', itemAlias: 'photo'});
    }
    
    
    
}