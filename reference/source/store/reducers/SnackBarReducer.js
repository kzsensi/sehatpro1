import { SHOW_SNACKBAR } from "../../utils/types";

const initialState = {
  snackbar: {
    message: "",
    open: false,
  }
};

const SnackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          message: action.payload.message,
          open: action.payload.open,
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
};
export default SnackBarReducer;