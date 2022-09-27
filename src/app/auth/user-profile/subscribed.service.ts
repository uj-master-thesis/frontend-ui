import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.get<SubscribedResponse>('http://localhost:5000/subscribed/' + username, httpOptions);
  }

  subscribe(subscribedModel: SubscribedModel): Observable<any> {
    return this.http.post('http://localhost:5000/subscribe', subscribedModel);
  }
}
