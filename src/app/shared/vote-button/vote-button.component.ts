import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../post-model';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {VoteService} from "../vote.service";
import {AuthService} from '@auth0/auth0-angular';
import {PostService} from "../post.service";
import {ToastrService} from "ngx-toastr";
import {VotePayload} from "./vote-payload";
import {VoteType} from "./vote-type";
import {throwError} from "rxjs";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post!: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor?: string;
  downvoteColor?: string;
  logged = false;

  constructor(private voteService: VoteService,
              public auth: AuthService,
              private postService: PostService,
              private toastr: ToastrService) {
    this.votePayload = {
      voteType: undefined,
      postName: '',
    }
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        // @ts-ignore
        console.log(profile.name)
        // @ts-ignore
        this.votePayload.username = profile.email
        this.logged = true
      }
    );
    this.updateVoteDetails();
  }

  upvotePost() {
    if (this.logged) {
      this.votePayload.voteType = VoteType.UPVOTE;
      this.vote();
      this.downvoteColor = '';
    } else {
      this.toastr.info("Please log in first!")
    }
  }

  downvotePost() {
    if (this.logged) {
      this.votePayload.voteType = VoteType.DOWNVOTE;
      this.vote();
      this.upvoteColor = '';
    } else {
      this.toastr.info("Please log in first!")
    }
  }

  private vote() {
    this.votePayload.postName = this.post.postName;
    this.voteService.vote(this.votePayload).subscribe(() => {
      //probably unnecessary
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.postName).subscribe(post => {
      this.post = post;
    });
  }
}
