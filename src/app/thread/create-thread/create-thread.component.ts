import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ThreadModel} from '../thread-model';
import {Router} from '@angular/router';
import {ThreadService} from '../thread.service';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
  createSubredditForm: FormGroup;
  threadModel: ThreadModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router,
              private subredditService: ThreadService,
              private auth: AuthService) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.threadModel = {
      name: '',
      description: '',
      postCount: 0,
      username: ''
    }
  }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        // @ts-ignore
        console.log(profile.name)
        // @ts-ignore
        this.threadModel.username = profile.name
      }
    );
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.threadModel.name = this.createSubredditForm?.get('title')?.value;
    this.threadModel.description = this.createSubredditForm?.get('description')?.value;
    console.log(this.threadModel)
    this.subredditService.createSubreddit(this.threadModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      console.log('Error occurred');
    })
  }
}
