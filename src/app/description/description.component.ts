import { Component, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailsServiceService } from '../services/item-details-service.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  currentItem: any;

  constructor(
    private route: ActivatedRoute,
    private detailsService: ItemDetailsServiceService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentItem = this.detailsService.getItem();
    }
  }
}
