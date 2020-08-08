import {
    INFO_DASHBOARD 
} from '../actions/DashboardAction';

const INITIAL_STATE = {   
    dashboardInfo: {
       name: 'Trisoft Front End Base v.2',
       version: '0002'
    }
}

export const DashboardReducer = (state = INITIAL_STATE, action) =>{    
    switch(action.type){
        case INFO_DASHBOARD:        
        return {
            ...state,
            dashboard:{
                info: action.payload
            }
        };        
        default:
            return state;
    }
}