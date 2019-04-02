import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private httpClient: HttpClient) {
  }

  addPost(post: Post) {
    this.httpClient.post<{message: string, post: Post}>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {
        this.posts.push(response.post);
        this.postsChanged.next(this.posts.slice());
      });
  }

  deletePost(id: string) {
    this.httpClient.delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe((response) => {
        this.getPosts();
      });
  }

  getPosts() {
    this.httpClient.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            content: post.cotent,
            title: post.title
          };
        });
      }))
      .subscribe((data) => {
        this.posts = data;
        this.postsChanged.next(this.posts.slice());
      });
  }

  // By passing the postChanged subject as an Observable, no one outside the service
  // will be able to add events to it and will only be able to subscribe
  getPostsUpdatedListener() {
    return this.postsChanged.asObservable();
  }
}
