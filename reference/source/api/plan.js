import { SHOW_SNACKBAR, IS_LOADING } from "../utils/types";

const getApiLoaderDispatch = (res, dispatch) => {
  dispatch({ type: IS_LOADING, payload: { type: IS_LOADING, payload: res } });
};

export const planPurchaseRequest =
  (data, token, action) => async (dispatch) => {
    getApiLoaderDispatch(true, dispatch);
    const url = `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/request`;
    try {
      const res_1 = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res_1?.status === 200) {
        action(await res_1?.json());
      } else if (res_1?.status === 400) {
        const rrr = await res_1?.json();
        dispatch({
          type: SHOW_SNACKBAR,
          payload: {
            type: "error",
            message:
              rrr?.description ??
              "Customer with this phone number has already bought the plan.",
            open: true,
          },
        });
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
      getApiLoaderDispatch(false, dispatch);
    } catch {
      getApiLoaderDispatch(false, dispatch);
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

async function getOnTransaction(url, token) {
  return await fetch(url, {
    method: "GET",
    headers: { Authorization: `bearer ${token}` },
  });
}

export const tryGetPlanTransaction = async (transactionId, token) => {
  try {
    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 1500));
      console.log("dispatch slip loop", i);
      const res = await getOnTransaction(
        `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/transaction/${transactionId}`,
        token
      );
      const result = await res?.json();
      if (result?.status === "SUCCESS") {
        return result;
      } else if (res?.status === 200) {
        if (i === 3) {
          return result;
        } else {
          continue;
        }
      } else {
        return {};
      }
    }
  } catch (error) {
    return error;
  }
};

export const getPlanPaymentDetails =
  (transactionId, token, action) => async (dispatch) => {
    getApiLoaderDispatch(true, dispatch);
    const url = `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/transaction-detail/${transactionId}`;
    try {
      const res_1 = await fetch(url, {
        method: "GET",
        headers: { Authorization: `bearer ${token}` },
      });
      if (res_1?.status === 200) {
        action(await res_1.json());
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
      getApiLoaderDispatch(false, dispatch);
    } catch {
      getApiLoaderDispatch(false, dispatch);
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

export const updateTransactionDetail =
  (data, token, action) => async (dispatch) => {
    getApiLoaderDispatch(true, dispatch);
    const url = `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/update-transaction-detail`;
    try {
      const res_1 = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res_1?.status === 200) {
        action(await res_1.json());
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
      getApiLoaderDispatch(false, dispatch);
    } catch {
      getApiLoaderDispatch(false, dispatch);
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

// Get OTP and Verify OTP
export const SendOTP = (data, token, action) => async (dispatch) => {
  getApiLoaderDispatch(true, dispatch);
  const url = `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/send-otp`;
  try {
    const res_1 = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res_1) {
      action(res_1);
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
    getApiLoaderDispatch(false, dispatch);
  } catch {
    getApiLoaderDispatch(false, dispatch);
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

export const VerifyOTP = (data, token, action) => async (dispatch) => {
  getApiLoaderDispatch(true, dispatch);
  const url = `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/verify-otp`;
  try {
    const res_1 = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res_1) {
      action(res_1);
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
    getApiLoaderDispatch(false, dispatch);
  } catch {
    getApiLoaderDispatch(false, dispatch);
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

export const getAgents = (data, token, action) => async (dispatch) => {
  getApiLoaderDispatch(true, dispatch);
  const url = `${process.env.REACT_APP_DATA_SERVICE_APIURL}/reporting/public/tenant-users`;
  try {
    const res_1 = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res_1?.status === 200) {
      action(await res_1?.json());
    } else if (res_1?.status === 400) {
      const rrr = await res_1?.json();
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          type: "error",
          message:
            rrr?.description ??
            "Customer with this phone number has already bought the plan.",
          open: true,
        },
      });
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
    getApiLoaderDispatch(false, dispatch);
  } catch {
    getApiLoaderDispatch(false, dispatch);
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

export const getSearchData = (data, token, action) => async (dispatch) => {
  getApiLoaderDispatch(true, dispatch);
  const url = `${process.env.REACT_APP_TAGGING_SERVICE_APIURL}/search`;
  try {
    const res_1 = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res_1?.status === 200) {
      action(await res_1?.json());
    } else if (res_1?.status === 400) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          type: "error",
          message:
            "Customer with this phone number has already bought the plan.",
          open: true,
        },
      });
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
    getApiLoaderDispatch(false, dispatch);
  } catch {
    getApiLoaderDispatch(false, dispatch);
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
export const getMethods = (tenantId, token, action) => async (dispatch) => {
  getApiLoaderDispatch(true, dispatch);
  const url = `${process.env.REACT_APP_ACCOUNT_SERVICE_APIURL}/tenant/payment-gateways/${tenantId}`;
  try {
    const res_1 = await fetch(url, {
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
    });
    if (res_1?.status === 200) {
      action(await res_1.json());
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
    getApiLoaderDispatch(false, dispatch);
  } catch {
    getApiLoaderDispatch(false, dispatch);
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



export const getTransactionDetails =
  (data, token, action) => async (dispatch) => {
    getApiLoaderDispatch(true, dispatch);
    const url = `${process.env.REACT_APP_PLAN_SERVICE_APIURL}/plan-purchase/create-payment-order`;
    try {
      const res_1 = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res_1?.status === 200) {
        action(await res_1.json());
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
      getApiLoaderDispatch(false, dispatch);
    } catch {
      getApiLoaderDispatch(false, dispatch);
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

  export const sendNotification =
  (data, token, action) => async (dispatch) => {
    getApiLoaderDispatch(true, dispatch);
    const url = `${process.env.REACT_APP_NOTIFICATION_SERVICE_APIURL}/send-notification`;
    try {
      const res_1 = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res_1?.status === 200) {
        action();
      } else {
        dispatch({
          type: SHOW_SNACKBAR,
          payload: {
            type: "error",
            message: "Email sening failed",
            open: true,
          },
        });
      }
      getApiLoaderDispatch(false, dispatch);
    } catch (e) {
      console.error("Error in sendNotification:", e);
      getApiLoaderDispatch(false, dispatch);
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