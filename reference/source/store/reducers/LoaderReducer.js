import { IS_LOADING, IS_PAGELOADING } from "../../utils/types";

const initialState = {
  isApiLoading: false,
  isPageLoading: false
};

const LoaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isApiLoading: action.payload,
      };
    case IS_PAGELOADING:
      return {
        ...state,
        isPageLoading: action.payload,
      };
    default:
      return state;
  }
};
export default LoaderReducer;