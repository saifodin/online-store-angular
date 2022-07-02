import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() componentName: string = '';
  @Input() originalImgPath: string = '';

  progress: number = 0;
  // message: string = "";
  // isComplete: boolean = false;
  isError: boolean = false;
  changeOriginalImage = false;
  errorMessage: string = '';
  imageName: string = "";
  isThereImage: boolean = false;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }
  ngOnInit() {
    // console.log(this.componentName)
    // if (this.componentName == 'edit'){
    //   this.isThereImage = true;
    //   console.log("this.originalImgPath", this.originalImgPath)
    //   // this.onUploadFinished.emit(this.originalImgPath);
    // }
  }

  ngOnChanges() {
    this.onUploadFinished.emit({ dbPath: null });
    if (this.componentName == 'edit') {
      this.isThereImage = true;
      this.onUploadFinished.emit({ dbPath: this.originalImgPath });
    }
  }

  uploadFile(files: any) {
    console.log("upload-image.component.ts.uploadFile()")
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.imageName = fileToUpload.name;
    this.http.post('https://localhost:7159/api/Product/image', formData, { reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
          // this.message = 'Upload Image Success';
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total)
              this.progress = Math.round(100 * event.loaded / event.total);
          }
          else if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
            console.log("emit from upload to form", event.body)
            this.isThereImage = true;
            this.componentName = "create";
            // this.isComplete = true;
            console.log("Upload Image Success")
            this.isError = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          // this.message = 'Upload Image Error';
          console.log("Upload Image Error")
          this.isThereImage = false;
          // this.isComplete = true;
          this.isError = true;
          this.errorMessage = err.error
        }
      });
  }

  deleteImage() {
    console.log(this.imageName, this.originalImgPath)
    if (this.imageName !== "") {
      var request = `https://localhost:7159/api/Product/image/${this.imageName}`
      // if (this.componentName == 'edit')
      //   request = `https://localhost:7159/api/Product/image/${this.originalImgPath.slice(17)}`
      this.http.delete(request, { responseType: 'text' }).subscribe({
        next: (event) => {
          console.log(event);
          this.onUploadFinished.emit({ dbPath: null });
          // this.isComplete = false;
          this.isThereImage = false;
          console.log("Delete Image Success");
          this.progress = 0;
          // this.message = '';
        },
        error: (err: HttpErrorResponse) => {
          console.log("Delete Image Error");
          // this.isComplete = false;
          // this.isThereImage = true;
        }
      });
    }
    else {
      console.log("fake delete")
      this.isThereImage = false;
    }
  }

}
