import { Injectable } from '@angular/core';
import {CommentPayload} from "./comment-payload";
import {HttpClient} from "@angular/common/http";
import {COMMENTS_MODEL} from "../mocked/mock-comment-model";
import {EMPTY, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  postComment(commentPayload: CommentPayload) {
    return of(commentPayload);
  }

  getAllCommentsForPost(postId: number) {
    return of(COMMENTS_MODEL)
  }

  getAllCommentsByUser(name: string) {
    return of(COMMENTS_MODEL)
  }
}
