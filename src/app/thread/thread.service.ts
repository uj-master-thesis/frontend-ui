import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ThreadModel} from './thread-model';
import {SUBREDDIT_MODELS} from "../mocked/mock-thread-model";

//TODO: add real http requests when service will be ready
@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private http: HttpClient) {
  }

  // getAllSubreddits(): Observable<Array<SubredditModel>> {
  //   return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/');
  // }

  getAllSubreddits(): Observable<Array<ThreadModel>> {
    return of(SUBREDDIT_MODELS);
  }

  // createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
  //   return this.http.post<SubredditModel>('http://localhost:8080/api/subreddit',
  //     subredditModel);
  // }

  createSubreddit(subredditModel: ThreadModel): Observable<ThreadModel> {
    return of(subredditModel);
  }
}
