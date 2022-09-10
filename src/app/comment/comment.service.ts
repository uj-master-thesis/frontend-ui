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

  constructor(private http: HttpClient) {
  }

  postComment(commentPayload: CommentPayload) {
    return this.http.post<CommentPayload>('http://localhost:5000/uploader/comment', commentPayload);
  }

  getAllCommentsForPost(postName: string) {
    return this.http.get<Array<CommentPayload>>('http://localhost:5000/api/comment/' + postName);
  }

  getAllCommentsByUser(name: string) {
    return this.http.get<Array<CommentPayload>>('http://localhost:5000/api/comment/by-user/' + name);
  }
}
