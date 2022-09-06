import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ThreadModel} from 'src/app/thread/thread-model';
import {Router} from '@angular/router';
import {PostService} from 'src/app/shared/post.service';
import {ThreadService} from 'src/app/thread/thread.service';
import {CreatePostPayload} from './create-post-payload';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  threads?: Array<ThreadModel>;
  file: File | undefined; // Variable to store file
  cardImageBase64?: string;
  isImageSaved: boolean;

  constructor(private router: Router, private postService: PostService,
              private subredditService: ThreadService) {
    this.isImageSaved = false;
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      threadName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      threadName: ''
    }
  }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.threads = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm?.get('postName')?.value;
    this.postPayload.threadName = this.createPostForm?.get('threadName')?.value;
    this.postPayload.url = this.createPostForm?.get('url')?.value;
    this.postPayload.description = this.createPostForm?.get('description')?.value;
    this.postPayload.fileCompressed = this.cardImageBase64;
    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  // @ts-ignore
  onChange(fileInput: any) {
    let imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        // @ts-ignore
        image.onload = rs => {
          // @ts-ignore
          const img_height = rs.currentTarget['height'];
          // @ts-ignore
          const img_width = rs.currentTarget['width'];

          console.log('height and width:', img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            console.log(imgBase64Path)
            console.log(this.cardImageBase64)
            this.isImageSaved = true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
