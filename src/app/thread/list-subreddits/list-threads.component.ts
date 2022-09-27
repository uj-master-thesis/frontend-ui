import {Component, OnInit} from '@angular/core';
import {ThreadModel} from '../thread-model';
import {ThreadService} from '../thread.service';
import {concatMap, switchMap, throwError} from 'rxjs';
import { timer  } from 'rxjs';
import { of  } from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-threads.component.html',
  styleUrls: ['./list-threads.component.css']
})
export class ListThreadsComponent implements OnInit {

  threads?: Array<ThreadModel>;

  constructor(private subredditService: ThreadService) {
  }

  ngOnInit() {

    timer(1000).pipe(switchMap( () => this.subredditService.getAllSubreddits())).subscribe(data => {
      this.threads = data;
    }, error => {
      throwError(error);
    })
  }
}
