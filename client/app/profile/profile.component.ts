import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { Post } from '../shared/models/post.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  isLoading = true;

  posts: Post[] = [];

  message = new FormControl();

  // form = new FormGroup({
  //   message: this.message
  // });

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private postService: PostService,
    public toast: ToastComponent,
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getUser();
  }

  test(): void {
    const post = new Post();
    post.sourceUserID = this.user._id;
    post.createdAt = new Date();
    post.caption = this.message.value;
    post.title = 'Some Post Title';

    this.postService.addPost(post).subscribe({
      next: () => {
        this.toast.setMessage('Item added successfully.', 'success');
        this.getPosts();
      },
      error: error => console.log(error)
    });
  }

  private getPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.toast.setMessage('Posts loaded successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

  private getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }
}
