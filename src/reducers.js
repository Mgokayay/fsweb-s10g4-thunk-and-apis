import { useDispatch } from "react-redux";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  REMOVE_FAVS_FROM_LS,
  fetchAnother,
} from "./actions";

import { toast } from "react-toastify";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}
function removeFavsFromLocalStorage() {
  localStorage.removeItem("s10g4");
}
export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const oldFav = state.favs.find((item) => item.id == action.payload.id);
      if (oldFav) {
        toast.warn("Daha önce eklendi");
        return state;
      } else {
        toast.success("Başarıyla eklendi");
        const addFavState = { ...state, favs: [...state.favs, action.payload] };
        writeFavsToLocalStorage(addFavState);
        return addFavState;
      }

    case FAV_REMOVE:
      const removedFavState = {
        ...state,
        favs: state.favs.filter((item) => item.id !== action.payload),
      };
      writeFavsToLocalStorage(removedFavState);
      toast.success("Başarıyla Silindi");
      return removedFavState;

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, error: null, loading: false };

    case FETCH_LOADING:
      return { ...state, current: null, error: null, loading: true };

    case FETCH_ERROR:
      return { ...state, current: null, error: action.payload, loading: false };

    case REMOVE_FAVS_FROM_LS:
      removeFavsFromLocalStorage();

      return { ...state, favs: initial.favs };

    case GET_FAVS_FROM_LS:
      const favFromLs = readFavsFromLocalStorage();
      // return { ...state, favs: favFromLs ? favFromLs : [] };
      return { ...state, favs: favFromLs ?? [] };

    default:
      return state;
  }
}
