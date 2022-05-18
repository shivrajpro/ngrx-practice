import { createReducer, on } from "@ngrx/store";
import { customIncr, decrement, increment, reset } from "./counter.actions";
import { initialState } from "./counter.state";

export const counterReducer = createReducer(initialState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        }
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        }
    }),
    on(reset, (state) => {
        return {
            ...state,
            counter: 0
        }
    }),
    on(customIncr, (state, action)=>{
        // console.log("action=",action);
        return{
            ...state,
            counter: state.counter + action.value
        }
    })
    );