import { Component, OnInit } from '@angular/core';

import { IPost } from '../../model/post';
import { PostService } from '../../service/post.service';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  posts: IPost[] = [];
  isLoading = true;

  constructor(private postService: PostService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts()
      .subscribe({
        next: response => {
          for (const postId in response) {
            this.posts.unshift({ ...response[postId], id: postId });
          }
          this.isLoading = false;
        },
        error: error => {
          console.log(error);
          this.isLoading = false;
          this.snackBarService.showMessage('Could not load posts');
        }
      })
  }

  onPostCreated(createdPost: IPost) {
    this.posts.unshift(createdPost);
  }

  onPostUpdated(updatedPost: IPost) {
    const postIndex = this.posts.findIndex(post => post.id === updatedPost.id);
    this.posts[postIndex] = updatedPost;
  }

  onPostDeleted(postId: string) {
    const postIndex = this.posts.findIndex(post => post.id === postId);
    this.posts.splice(postIndex, 1);
  }

}
