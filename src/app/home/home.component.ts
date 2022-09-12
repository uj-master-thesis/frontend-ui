import {Component, OnInit} from '@angular/core';
import {PostModel} from '../shared/post-model';
import {PostService} from '../shared/post.service';
import { timer,  switchMap} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: Array<PostModel> = [];

  constructor(private postService: PostService) {
    timer(500).pipe(switchMap(() => this.postService.getAllPosts())).subscribe(post => {
      this.posts$ = post;
    });
  }

  ngOnInit(): void {
  }

}
