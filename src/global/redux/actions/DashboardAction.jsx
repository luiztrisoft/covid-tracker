export const INFO_DASHBOARD = 'INFO_DASHBOARD'

export const showValue = (event) =>(        
    {
        type: INFO_DASHBOARD,
        payload: event.target.value        
    }
);