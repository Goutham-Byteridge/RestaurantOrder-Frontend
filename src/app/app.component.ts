import { Component, ViewChild } from '@angular/core';
import { CartComponent } from 'src/app/cart/cart.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentItem;
  @ViewChild('cart') cart:CartComponent;


  addItem(newItem: string) {
    this.cart.addNewItem(newItem);
  }
}