import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {
  // @Output() increment = new EventEmitter();
  // @Output() decrement = new EventEmitter();
  // @Output() reset = new EventEmitter();

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
  }

  onIncrement() {
    // this.increment.emit();
    this.store.dispatch(increment());
  }

  onDecrement() {
    // this.decrement.emit();
    this.store.dispatch(decrement());
  }

  onReset() {
    // this.reset.emit();
    this.store.dispatch(reset());
  }
}
