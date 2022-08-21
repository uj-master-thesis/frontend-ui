import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post-model";
import {Router} from "@angular/router";
import { faComments } from '@fortawesome/free-solid-svg-icons';
import {PostService} from "../post.service";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() posts?: PostModel[];
  faComments = faComments;

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    console.log('id:' + id)
    this.router.navigateByUrl('/view-post/' + id);
  }
}
