import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostModel} from './post-model';
import {Observable, of} from 'rxjs';
import {POST_MODELS} from "../mocked/mock-post-model";
import {CreatePostPayload} from "../post/create-post/create-post-payload";
// import { CreatePostPayload } from '../post/create-post/create-post.payload';

//TODO: add real http requests when service will be ready
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Array<PostModel>> {
    //   return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
    return of(POST_MODELS);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    //   return this.http.post('http://localhost:8080/api/posts/', postPayload);
    console.log(postPayload)
    return of(postPayload);
  }

  getPost(postName: string): Observable<PostModel> {
    return of(POST_MODELS[1])
    // return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return of([POST_MODELS[0], POST_MODELS[1]])
    // return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  }
}
