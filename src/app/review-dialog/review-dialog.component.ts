import { Component, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {


  reviewForm = new FormGroup({
    rating :  new FormControl( {value: 0 }, [Validators.required, Validators.min(1), Validators.max(5)]),
    comments : new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  
  submit(): void {
      this.dialogRef.close('proceed');
  }

  cancel() {
    this.dialogRef.close();
  }

}
