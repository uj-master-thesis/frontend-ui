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

  getAllSubreddits(): Observable<Array<ThreadModel>> {
    return this.http.get<Array<ThreadModel>>('http://localhost:5000/api/thread');
  }

  // getAllSubreddits(): Observable<Array<ThreadModel>> {
  //   return of(SUBREDDIT_MODELS);
  // }

  createSubreddit(subredditModel: ThreadModel): Observable<ThreadModel> {
    return this.http.post<ThreadModel>('http://localhost:5000/uploader/thread',
      subredditModel);
  }

  // createSubreddit(subredditModel: ThreadModel): Observable<ThreadModel> {
  //   return of(subredditModel);
  // }
}
