import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { SHOW_SNACKBAR } from "../utils/types";

function Snackbar() {
    const dispatch = useDispatch();
    const { message, type, open } = useSelector((state) => state.SnackBarReducer.snackbar);

    console.log( open, "bbbbdf")
    console.log( type, "qasdfb")
    console.log(message, "bbbbbbb")


    function handleClose() {
        dispatch({
            type: SHOW_SNACKBAR,
            payload: { open: false, type: "success", message: "" },
        });
    }

    const snackbarStyle = () => {
        if (open && type) {
            let BackgroundColor = null;
            switch (type) {
                case "success":
                    BackgroundColor = "#16A34A";
                    break;
                case "error":
                    BackgroundColor = "#EE4B2B";
                    break;
                case "failed":
                    BackgroundColor = "#f0ad4e";
                    break;
                case "info":
                    BackgroundColor = "#123B7C";
                    break;
                default:
                    BackgroundColor = type;
                    break;
            }
            setTimeout(() => {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: { open: false, type: "", message: "" },
                });
            }, 3000);
            return { backgroundColor: BackgroundColor };
        } else {
            return {};
        }
    }

    return (
        <div className={open ? "snackbar show" : "snackbar"} style={snackbarStyle()}>
            {message}
        </div>
    );
}

export default Snackbar
