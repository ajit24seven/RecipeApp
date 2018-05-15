import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload/upload', itemAlias: 'photo'});
  constructor() { }
  filePaths = "";
  ngOnInit() {
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let test = JSON.parse(response); 
            this.filePaths = test.filpath.path;
        };
  }

}
