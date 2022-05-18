import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannel, customIncr } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value:any;
  channelName:any;
  constructor(private store:Store<{counter:CounterState}>) { }

  ngOnInit(): void {
    this.store.select("counter").subscribe(data =>{
      console.log("channel name obs called");
      this.channelName = data.channelName;
    })
  }

  onAdd(){
    this.store.dispatch(customIncr({value:+this.value}));
    this.value = '';
  }

  onChangeChannel(){
    this.store.dispatch(changeChannel());
  }
}
