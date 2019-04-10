import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  editMode: boolean;
  postForm: FormGroup;
  private postId: string;
  isLoading = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {
  }

  get controls() {
    return this.postForm.controls;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.editMode = true;
      } else {
        this.editMode = false;
      }
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      const updatedPost = {
        id: this.postId,
        content: this.postForm.value.content,
        title: this.postForm.value.title
      };
      this.postService.editPost(updatedPost);
    } else {
      this.postService.addPost(this.postForm.value);
    }
    this.isLoading = true;
    this.resetForm();
  }

  resetForm() {
    this.postForm.reset();
    Object.keys(this.postForm.controls).forEach(key => {
      this.postForm.controls[key].setErrors(null);
    });
  }

  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

    if (this.editMode) {
      this.postService.getPost(this.postId);
      this.postService.getPostUpdatedListener().subscribe((post) => {
        this.isLoading = false;
        this.postForm.patchValue({
          title: post.title,
          content: post.content
        });
      });
    }
  }
}
