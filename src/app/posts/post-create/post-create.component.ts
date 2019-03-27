import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.postService.addPost(this.postForm.value);
    this.resetForm();
  }

  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  resetForm() {
    this.postForm.reset();
    Object.keys(this.postForm.controls).forEach(key => {
      this.postForm.controls[key].setErrors(null);
    });
  }

  get controls() {
    return this.postForm.controls;
  }
}
