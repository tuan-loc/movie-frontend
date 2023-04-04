import {GET_FILM_TICKET} from "../types/TicketType";

const initialState = {
    filmTicketData: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_FILM_TICKET: {
            state.filmTicketData = action.filmTicketData;
            return {...state}
        }
        default:
            return {...state};
    }
};
