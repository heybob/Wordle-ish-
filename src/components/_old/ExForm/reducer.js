import { FORM_SUBMITTED } from "./actions";
export function FormReducer(state, action) {
    switch(action.type) {
        case FORM_SUBMITTED: 
            return {
                ...state, formSubmitted: true
            }
        default:
            return state;
    }

}