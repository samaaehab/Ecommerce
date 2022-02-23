import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  stars=[1,2,3,4,5];
  @Input() rate=5;
  @Output() change=new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  onRatingChanged(rate:number):void{
    this.rate=rate;
    this.change.emit(rate);
    alert(rate);

  }

}
