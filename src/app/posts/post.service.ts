import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private httpClient: HttpClient) {
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsChanged.next(this.posts.slice());
  }

  getPosts() {
    this.httpClient.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((response) => {
        this.posts = response.posts;
        this.postsChanged.next(this.posts.slice());
      });
  }

  // By passing the postChanged subject as an Observable, no one outside the service
  // will be able to add events to it and will only be able to subscribe
  getPostsUpdatedListener() {
    return this.postsChanged.asObservable();
  }
}
