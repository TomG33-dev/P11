import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions"

const initialState = {
    status: "VOID",
    firstname: null,
    lastname: null,
    username: null
}

export const userReducer = (state = initialState, action ) => {
    switch (action.type) {
        case GET_USERPROFILE:
            return {
                ...state,
                status: "SUCCEEDED",
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                username: action.payload.username
            }

        case EDIT_USERNAME: 
            return {
                ...state,
                status: "MODIFIED",
                username: action.payload
            } 

        case LOGOUT: {
            return initialState;  
        }   
        
        default:
            return state;    
    }
}

        