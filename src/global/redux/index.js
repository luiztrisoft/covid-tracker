import { createStore } from 'redux';
import {combineReducers} from 'redux';

import { GlobalReducer } from './reducers/GlobalReducer';
import { DashboardReducer } from './reducers/DashboardReducer';

/**
* Todos os reducers devem ser adicionados.
*/
export const Reducers = combineReducers ({
    globalReducer: GlobalReducer,
    dashboardReducer: DashboardReducer
});

export const Store = createStore(Reducers);