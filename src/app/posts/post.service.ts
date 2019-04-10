import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private postsChanged = new Subject<Post[]>();
  private postChanged = new Subject<Post>();
  private posts: Post[] = [];
  private post: Post = null;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  addPost(post: Post) {
    this.httpClient.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {
        this.posts.push(response.post);
        this.postsChanged.next(this.posts.slice());
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.httpClient.delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe((response) => {
        this.getPosts();
      });
  }

  editPost(post: Post) {
    this.httpClient.patch(`http://localhost:3000/api/posts/${post.id}`, post)
      .subscribe((response) => {
        this.getPosts();
        this.router.navigate(['/']);
      });
  }

  getPost(id: string) {
    this.httpClient.get<{ message: string, post: any }>(`http://localhost:3000/api/posts/${id}`)
      .pipe( map ((response) => {
        const fetchedPost = response.post;
        return {
          id: fetchedPost._id,
          title: fetchedPost.title,
          content: fetchedPost.content
        };
      }))
      .subscribe((post) => {
        this.post = post;
        this.postChanged.next({...this.post});
      });
  }

  getPosts() {
    this.httpClient.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            content: post.content,
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

  getPostUpdatedListener() {
    return this.postChanged.asObservable();
  }
}
