import { SHOW_SNACKBAR, IS_LOADING } from "../utils/types";

const getApiLoaderDispatch = (res, dispatch) => {
    dispatch({ type: IS_LOADING, payload: { type: IS_LOADING, payload: res } });
};

export const generateTokenByApiKey = (data = {}, clientId, headers, action) => async (dispatch) => {
    //getApiLoaderDispatch(true, dispatch);
    const url = `${process.env.REACT_APP_PRODUCT_APIURL}/oauth2/token?client_id=${clientId}`;
    try {
        const res_1 = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(data) });
        if (res_1.ok) {
            const result = await res_1.json();
            action(result);
        } else {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {
                    type: "error",
                    message: "Some Error Occurred",
                    open: true,
                },
            });
        }
        //getApiLoaderDispatch(false, dispatch);
    } catch {
        //getApiLoaderDispatch(false, dispatch);
        dispatch({
            type: SHOW_SNACKBAR,
            payload: {
                type: "error",
                message: "Please contact with administrator",
                open: true,
            },
        });
    }
};