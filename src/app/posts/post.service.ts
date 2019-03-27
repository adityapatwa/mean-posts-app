import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private posts: Post[] = [];

  addPost(post: Post) {
    this.posts.push(post);
    this.postsChanged.next(this.posts.slice());
  }

  getPosts() {
    return this.posts.slice();
  }

  // By passing the postChanged subject as an Observable, no one outside the service
  // will be able to add events to it and will only be able to subscribe
  getPostsUpdatedListener() {
    return this.postsChanged.asObservable();
  }
}
