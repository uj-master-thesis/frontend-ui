import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VotePayload} from "./vote-button/vote-payload";
import {Observable, of} from "rxjs";
import {VOTE_MODELS} from "../mocked/mock-vote";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return of(VOTE_MODELS);
  }
}
