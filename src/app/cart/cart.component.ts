import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Menu } from 'src/app/interface/restaurant-interface';
import { RestaurantApiService } from 'src/app/restaurant-api.service'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() item; // decorate the property with @Input()

  order: Array<Menu> = [];
  displayedColumns: string[] = ['id' ,'name', 'amount'];
  orderDataSource = new MatTableDataSource(this.order);
  constructor(
    private restaurantApiService: RestaurantApiService

  ) { }

  ngOnInit(): void {
  }

  // ngOnChanges() {
  //   if(this.item) {
  //     this.order.push(JSON.parse(JSON.stringify(this.item)));
  //   }

  // }

  addNewItem(newItem) {
    if(newItem) {
      this.order.push(newItem);
      this.orderDataSource = new MatTableDataSource(this.order);

    }
  }

  sendOrder() {
    let items = [];
    this.order.forEach(item => {
      items.push(item.id);
    });
    const body = {
      items: items
    }
    this.restaurantApiService.submitOrder(body).subscribe(res => {
      let order = res['body']['data'];
      order.comments = '';
      order.rating = 0;
      this.restaurantApiService.addToOrders(order);
      this.order = [];
      this.orderDataSource = new MatTableDataSource(this.order);
    },
    err => {

    }
    )
  }

}
