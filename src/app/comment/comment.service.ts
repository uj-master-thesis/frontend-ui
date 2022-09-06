import {Injectable} from '@angular/core';
import {CommentPayload} from "./comment-payload";
import {HttpClient} from "@angular/common/http";
import {COMMENTS_MODEL} from "../mocked/mock-comment-model";
import {of} from "rxjs";

//TODO: add real http requests when service will be ready
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(commentPayload: CommentPayload) {
    return of(commentPayload);
  }

  getAllCommentsForPost(postName: string) {
    return of(COMMENTS_MODEL)
  }

  getAllCommentsByUser(name: string) {
    return of(COMMENTS_MODEL)
  }
}
