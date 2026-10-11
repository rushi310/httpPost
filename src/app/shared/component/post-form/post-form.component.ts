import { Component, EventEmitter, Output, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPost } from '../../model/post';
import { PostService } from '../../service/post.service';
import { SnackBarService } from '../../service/snack-bar.service';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  @ViewChild('postForm') postForm!: NgForm;
  @Output() postUpdated = new EventEmitter<IPost>();
  @Output() postCreated = new EventEmitter<IPost>();
  editingPostId?: string;
  private editSubscription!: Subscription;

  constructor(private postService: PostService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.listenForEdit();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  submitPost() {
    if (this.postForm.form.invalid) {
      return;
    }
    if (this.editingPostId) {
      this.saveUpdatedPost();
    } else {
      this.saveNewPost();
    }
  }

  saveNewPost() {
    const newPost: IPost = this.postForm.form.value;
    this.postService.addPost(newPost)
      .subscribe({
        next: response => {
          newPost.id = response.name;
          this.postCreated.emit(newPost);
          this.postForm.resetForm();
          this.snackBarService.showMessage('Post added');
        },
        error: error => {
          console.log(error);
          this.snackBarService.showMessage('Could not add post');
        }
      })
  }

  saveUpdatedPost() {
    const updatedPost: IPost = { ...this.postForm.form.value, id: this.editingPostId };
    this.postService.updatePost(updatedPost)
      .subscribe({
        next: () => {
          this.postUpdated.emit(updatedPost);
          this.cancelEdit();
          this.snackBarService.showMessage('Post updated');
        },
        error: error => {
          console.log(error);
          this.snackBarService.showMessage('Could not update post');
        }
      })
  }

  listenForEdit() {
    this.editSubscription = this.postService.editPost$.subscribe(selectedPost => {
      this.postForm.form.patchValue(selectedPost);
      this.editingPostId = selectedPost.id;
    })
  }

  cancelEdit() {
    this.editingPostId = undefined;
    this.postForm.resetForm();
  }

}
