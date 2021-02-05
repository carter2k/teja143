import { createStore } from 'redux';

const city_reducer = (state, action) => {
   switch (action.type) {
      case "SET_CITY":
         state = state + ',' + action.payload;
         break;
      default:
         break;
   }
   return state;
}


const store = createStore(city_reducer, 'GNT');

store.subscribe(() => {
   console.log("Latest state value ::" + store.getState());
});

store.dispatch({
   type: 'SET_CITY',
   payload: 'HYD'
});

store.dispatch({
   type: 'SET_CITY',
   payload: 'VIJ'
});


export default store;