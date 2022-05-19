import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { changeChannel, customIncr } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value:any;
  // channelName:any;
  channelName$:Observable<string>;
  constructor(private store:Store<AppState>) { 
    this.channelName$ = this.store.select(getChannelName);
  }

  ngOnInit(): void {
    // this.store.select(getChannelName).subscribe(channelName =>{
    //   console.log("channel name obs called");
    //   this.channelName = channelName;
    // })
  }

  onAdd(){
    this.store.dispatch(customIncr({value:+this.value}));
    this.value = '';
  }

  onChangeChannel(){
    this.store.dispatch(changeChannel());
  }
}
