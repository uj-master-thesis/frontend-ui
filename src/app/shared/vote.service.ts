import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VotePayload} from "./vote-button/vote-payload";
import {Observable, of} from "rxjs";
import {VOTE_MODELS} from "../mocked/mock-vote";

//TODO: add real http requests when service will be ready
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {
  }

  vote(votePayload: VotePayload): Observable<any> {
    // return this.http.post('http://localhost:8080/api/votes/', votePayload);
    return of(VOTE_MODELS);
  }
}
