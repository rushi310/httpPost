
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPost } from '../../model/post';
import { PostService } from '../../service/post.service';
import { SnackBarService } from '../../service/snack-bar.service';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: IPost;
  @Output() postDeleted = new EventEmitter<string>();

  constructor(private postService: PostService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) { }

  startEdit(selectedPost: IPost) {
    this.postService.editPost$.next(selectedPost);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmDelete(postId: string) {
    const dialogRef = this.dialog.open(GetConfirmComponent, {
      width: '350px',
      data: `Are you sure you want to delete "${this.post.title}"?`
    });

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.postService.deletePost(postId)
          .subscribe({
            next: () => {
              this.postDeleted.emit(postId);
              this.snackBarService.showMessage('Post deleted');
            },
            error: error => {
              console.log(error);
              this.snackBarService.showMessage('Could not delete post');
            }
          })
      }
    })
  }

}
