import {
    ATUALIZAR_CAMPO    
} from '../actions/GlobalAction';

const INITIAL_STATE = {
    form : {
        field: 'Put value field here'        
    }
}

export const GlobalReducer = (state = INITIAL_STATE, action) =>{    
    switch(action.type){
        case ATUALIZAR_CAMPO:        
        return {
            ...state,
            form: {
                [action.id]: action.payload
            }
        };        
        default:
            return state;
    }
}