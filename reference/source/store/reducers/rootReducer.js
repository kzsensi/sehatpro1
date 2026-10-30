import { combineReducers } from "redux";
import SnackBarReducer from "./SnackBarReducer";
import LoaderReducer from "./LoaderReducer";

export default combineReducers({
    SnackBarReducer,
    LoaderReducer
});