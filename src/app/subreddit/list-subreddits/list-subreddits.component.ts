import {Component, OnInit} from '@angular/core';
import {ThreadModel} from '../thread-model';
import {SubredditService} from '../subreddit-service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits?: Array<ThreadModel>;

  constructor(private subredditService: SubredditService) {
  }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
  }
}
