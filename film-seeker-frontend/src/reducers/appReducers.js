import { SEARCH_FILM, ERROR, LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
  films: [],
  name: "",  
  error: {
    value: false,
    errorMessage:""
  }
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FILM:
      return {
        ...state,
        films: action.payload,
        name: action.name,
        error: {
          value: false
        }
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ERROR:
      return {
        ...state,
        error: {
          value: true,
          errorMessage: action.payload
        }
      };
    default:
      return state;
  }
}

