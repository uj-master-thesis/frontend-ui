import {Component, OnInit} from '@angular/core';
import {PostService} from 'src/app/shared/post.service';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from 'src/app/comment/comment.service';
import {PostModel} from 'src/app/shared/post-model';
import {CommentPayload} from 'src/app/comment/comment-payload';
import {AuthService} from '@auth0/auth0-angular';
import {SubscribeService} from "./subscribed.service";
import {throwError} from "rxjs";
import {SubscribedModel} from "./subscribed-model";
import { timer,  switchMap} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts!: PostModel[];
  comments!: CommentPayload[];
  postsCount!: number;
  commentsCount!: number;
  profileJson: string = "";
  response: string = "";
  subscribed!: boolean;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
              private commentService: CommentService, public auth: AuthService, private subscribeService: SubscribeService) {

    this.name = this.activatedRoute.snapshot.params['name'];

    timer(500).pipe(switchMap(() => this.postService.getAllPostsByUser(this.name))).subscribe(data => {
      this.posts = data;
      this.postsCount = data.length;
    });

    timer(500).pipe(switchMap(() => this.commentService.getAllCommentsByUser(this.name))).subscribe(data => {
      this.comments = data;
      this.commentsCount = data.length;
    });
  }

  onChange(a: any) {
    console.log(a)
    console.log(a.target.result)
    console.log(this.subscribed)
    const changeSubscribedModel :SubscribedModel = {username: this.name, subscribed: this.subscribed}
    this.subscribeService.subscribe(changeSubscribedModel).subscribe(data => {
      this.response = data;
    }, error => {
      throwError(error);
    })

    // this.subscribeService.isSubscribed(this.name).subscribe(
    //   (data) => {
    //     this.subscribed = data.subscribed;
    //   }, error => {
    //     throwError(error);
    //   });
    console.log('response', this.response)
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
    timer(1000).pipe(switchMap(() => this.subscribeService.isSubscribed(this.name))).subscribe(
      (data) => {
        this.subscribed = data.subscribed;
      }, error => {
        throwError(error);
      });
  }

}
