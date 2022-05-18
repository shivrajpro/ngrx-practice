import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncr } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value:any;
  constructor(private store:Store<{counter:CounterState}>) { }

  ngOnInit(): void {
  }

  onAdd(){
    this.store.dispatch(customIncr({value:+this.value}));
    this.value = '';
  }
}
