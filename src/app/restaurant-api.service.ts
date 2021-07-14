import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { Menu } from './interface/restaurant-interface';


@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {
  apiUrl = environment.apiUrl;
  userId = UUID.UUID();
  orders: Array<any> = [];
  menu: Array<Menu> = [];
  menuMapping: Object = new Object();
  constructor(
    private http: HttpClient

  ) { }

  getMenu(): Observable<any>{
    let url = this.apiUrl + 'menu';
    return this.http.get(url);
  }

  submitOrder(order) : Observable<HttpResponse<any>>{
    let url = this.apiUrl + 'order';
    order.userId = this.userId;
    return this.http.post(url, order, { observe: 'response'});
  }

  submitReview(order) : Observable<HttpResponse<any>>{
    let url = this.apiUrl + 'order/review';
    return this.http.post(url, order, { observe: 'response'});
  }

 

  addToOrders(order) {
    order.itemList = [];
    order.items.forEach(item => {
      order.itemList.push(this.menuMapping[item])
    });
    console.log(this.orders);
    this.orders.push(order);
  }

  getOrders() {
    return this.orders;
  }

  setMenu(menu) {
    this.menu = menu;
    this.menu.forEach(menu => {
      this.menuMapping[menu['id']] = menu.name 
    })
  }
}
