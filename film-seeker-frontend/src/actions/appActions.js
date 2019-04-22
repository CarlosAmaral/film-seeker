import { SEARCH_FILM, ERROR, LOADING } from "./types";
import { trimString } from "../utils/helpers";

let typingTime = 0;

export const searchFilm = name => dispatch => {
  if (typingTime) {
    clearTimeout(typingTime);
  }

  typingTime = setTimeout(() => {
    dispatch(isLoading(true));

    httpGet(name)
      .then(data => dispatch({ name: name, payload: data, type: SEARCH_FILM }))
      .catch(async error => {
        let message;
        if (error.body) {
          const errorJSON = await error.json();
          message = errorJSON.errorMessage;
        }
        if (error.message) {
          message = error.message;
        }
        return dispatch({ payload: message, type: ERROR});
      });
    dispatch(isLoading(false));
  }, 300);
};

function httpGet(name) {
  return fetch(`${process.env.REACT_APP_BACKEND_API_SEARCH_MOVIE}?name=${trimString(name)}`)
  .then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

export const isLoading = boolean => dispatch =>
  dispatch({ payload: boolean, type: LOADING });
