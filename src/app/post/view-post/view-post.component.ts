import {Component, OnInit} from '@angular/core';
import {PostService} from 'src/app/shared/post.service';
import {ActivatedRoute} from '@angular/router';
import {PostModel} from 'src/app/shared/post-model';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentPayload} from 'src/app/comment/comment-payload';
import {CommentService} from 'src/app/comment/comment.service';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postName: string;
  post!: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private auth: AuthService) {
    this.postName = this.activateRoute.snapshot.params['postName'];
    this.postService.getPost(this.postName).subscribe(data => {
        this.post = data;
      }, error => {
        throwError(error);
      }
    )
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postName: this.postName
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
    this.auth.user$.subscribe(
      (profile) => {
        // @ts-ignore
        console.log(profile.name)
        // @ts-ignore
        this.commentPayload.username = profile.name
      }
    );
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentPayload.duration = Math.floor(Date.now() / 1000).toString();
    console.log(this.commentPayload)
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      console.log(data)
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postName).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postName).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

}
