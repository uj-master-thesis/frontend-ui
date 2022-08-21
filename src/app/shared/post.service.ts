

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import {Observable, of} from 'rxjs';
import {POST_MODELS} from "../mocked/mock-post-model";
import {CreatePostPayload} from "../post/create-post/create-post-payload";
// import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // getAllPosts(): Observable<Array<PostModel>> {
  //   return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  // }

  getAllPosts(): Observable<Array<PostModel>> {
    return of(POST_MODELS);
  }

  // createPost(postPayload: CreatePostPayload): Observable<any> {
  //   return this.http.post('http://localhost:8080/api/posts/', postPayload);
  // }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return of(postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return of(POST_MODELS[id])
    // return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  }
}
