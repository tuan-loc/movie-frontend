/* eslint-disable import/no-anonymous-default-export */
import {
  GET_CINEMAS,
  CHOOSE_CINEMA,
  GET_SUB_CINEMAS,
  CHOOSE_SUB_CINEMA,
} from "../types/CinemaType";

const initialState = {
  arrCinema: [],
  arrSubCinema: [],
  cinemaChoice: 0,
  subCinemaChoice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CINEMAS: {
      state.arrCinema = action.arrCinema;
      return { ...state };
    }
    case CHOOSE_CINEMA: {
      state.cinemaChoice = action.cinemaChoice;
      state.subCinemaChoice = 0;
      return { ...state };
    }
    case GET_SUB_CINEMAS: {
      state.arrSubCinema = action.arrSubCinema;
      return { ...state };
    }
    case CHOOSE_SUB_CINEMA: {
      state.subCinemaChoice = action.subCinemaChoice;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
