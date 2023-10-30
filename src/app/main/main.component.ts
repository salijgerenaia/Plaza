import { PostService } from '../post.service';
import { Component, OnInit } from '@angular/core';
import posts from '../../assets/db.json';
import { Info } from './interface';
import { Router } from '@angular/router';
import { ItemDetailsServiceService } from '../services/item-details-service.service';
import { HttpClient } from '@angular/common/http';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  randomDate = new Date();
  postsList: Info[] = [];
  currentItem: Info | undefined = this.detailsService.getItem();
  isAddingPost: boolean = false;

  constructor(
    private router: Router,
    private detailsService: ItemDetailsServiceService,
    private PostService: PostService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const storedPostsList = JSON.parse(
      localStorage.getItem('postsList') || '[]'
    );
    this.postsList = storedPostsList.length ? storedPostsList : posts.posts;
  }

  goToDetailsPage(id: number) {
    const foundPost = this.postsList.find((post) => post.id === id);
    if (foundPost) {
      this.currentItem = foundPost;
      this.detailsService.setItem(this.currentItem);

      this.router.navigate(['/description', this.currentItem.id]);
    } else {
      console.error('Post not found for ID:', id);
    }
  }

  toggleAddPost() {
    this.isAddingPost = !this.isAddingPost;
  }

  addElement(author: any, title: any, desc: any) {
    const newPost: BlogPost = {
      id: this.postsList.length + 1,
      title: title.value,
      author: author.value,
      date: new Date().toISOString(),
      description: desc.value,
    };

    this.postsList.unshift(newPost);

    this.savePostsToLocalStorage();

    this.PostService.addPost(newPost).subscribe((response) => {
      console.log('Response from addPost:', response);
    });

    title.value = '';
    author.value = '';
    desc.value = '';
  }

  savePostsToLocalStorage() {
    localStorage.setItem('postsList', JSON.stringify(this.postsList));
  }

  remove(element:any){
    element.style.display = 'none'
  }
}
