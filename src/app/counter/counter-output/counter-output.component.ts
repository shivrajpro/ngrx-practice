import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter: any;
  // counter: number = 0;
  counter$:Observable<number>;
  constructor(private store: Store<{ counter: CounterState }>) { 
    this.counter$ = this.store.select(getCounter);
  }

  ngOnInit(): void {
    // this.store.select(getCounter).subscribe((counter) => {
    //   console.log("counter obs called");
    //   this.counter = counter;
    // })
  }

}
