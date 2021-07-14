import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interface/restaurant-interface';
import {MatTableDataSource} from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { RestaurantApiService } from 'src/app/restaurant-api.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  title = 'restaurant';
  menu: Array<Menu> = [];
  userInput: string = '';
  displayedColumns: string[] = ['amount', 'name', 'add'];
  dataSource = new MatTableDataSource(this.menu);

  constructor(
    private restaurantApiService: RestaurantApiService
  ) { }

  ngOnInit(): void {

    this.restaurantApiService.getMenu().subscribe(res => {
      if(res.success) {
        this.menu = res.data;
        this.dataSource = new MatTableDataSource(this.menu);
        this.restaurantApiService.setMenu(this.menu);
      }
    },
    err => {

    }
    )
    // console.log(this.userId);

  }

  addToOrder(item) {
    this.newItemEvent.emit(item);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}