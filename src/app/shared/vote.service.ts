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
    console.log("votePayload: ", votePayload)
    return this.http.post('http://localhost:5000/uploader/vote', votePayload);
  }
}
