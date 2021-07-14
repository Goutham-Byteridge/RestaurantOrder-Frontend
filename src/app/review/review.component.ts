import { Component, OnInit } from '@angular/core';
import { RestaurantApiService } from 'src/app/restaurant-api.service'
import {MatDialog} from '@angular/material/dialog';
import { ReviewDialogComponent } from 'src/app/review-dialog/review-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  orders: Array<any> = [];
  displayedColumns: string[] = ['id' ,'rating', 'comments'];
  dataSource = new MatTableDataSource(this.orders);
  constructor(
    public restaurantApiService: RestaurantApiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openDialog(order) {
    order.orderId = order.id;

    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      disableClose: true,
      data: {
        order: order
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'proceed') {
        this.restaurantApiService.submitReview(order).subscribe(
          res => {
            order.submitted = true;
            console.log('rating submitted');
            this.orders = this.restaurantApiService.getOrders();
            
            console.log(this.orders);
          },
          err => {
            this._snackBar.open(err.error.message, 'Comment is invalid');
          }
        )
      }
    });
  }

}
