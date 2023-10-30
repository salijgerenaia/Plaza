import { Injectable } from '@angular/core';
import posts from '../../assets//db.json';
import { Info } from '../main/interface';
posts;

@Injectable({
  providedIn: 'root',
})
export class ItemDetailsServiceService {
  getItemById(id: number): any {
    throw new Error('Method not implemented.');
  }

  private item!: Info | undefined;

  constructor() {
    this.item = posts.posts[5];
  }

  setItem(itemReceived: Info) {
    this.item = itemReceived;
  }

  getItem() {
    return this.item;
  }
}
