import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { IPost, IPostRes } from '../model/post';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string = environment.base_url;
  postsUrl: string = `${this.baseUrl}/posts.json`;
  editPost$ = new Subject<IPost>();
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<IPostRes | null> {
    return this.http.get<IPostRes | null>(this.postsUrl);
  }

  addPost(post: IPost): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.postsUrl, post);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${this.baseUrl}/posts/${post.id}.json`, post);
  }

  deletePost(postId: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/posts/${postId}.json`);
  }
}
