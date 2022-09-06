import {Component, OnInit} from '@angular/core';
import {ThreadModel} from "../../thread/thread-model";
import {ThreadService} from "../../thread/thread.service";

@Component({
  selector: 'app-micronews-side-bar',
  templateUrl: './micronews-side-bar.component.html',
  styleUrls: ['./micronews-side-bar.component.css']
})
export class MicronewsSideBarComponent implements OnInit {

  subreddits: Array<ThreadModel> = [];
  displayViewAll?: boolean;

  constructor(private subredditService: ThreadService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  ngOnInit(): void {
  }

}
