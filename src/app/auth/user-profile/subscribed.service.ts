import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SubscribedModel} from "./subscribed-model";
import {SUBSCRIBED_MODELS} from "../../mocked/mock-subscribed-model";
import {SubscribedResponse} from "./subscribed-response";

//TODO: add real http requests when service will be ready
@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient) {
  }

  isSubscribed(username: String): Observable<SubscribedResponse> {
    console.log("username: ", username)
    const url = 'http://localhost:8080/api/subscribed/' + username
    console.log('url:', url)
    return of(SUBSCRIBED_MODELS[0]);
  }

  subscribe(subscribedModel: SubscribedModel): Observable<any> {
    console.log("subscribedModel: ", subscribedModel)
    // return this.http.post('http://localhost:8080/api/votes/', votePayload);
    return of(SUBSCRIBED_MODELS);
  }
}
