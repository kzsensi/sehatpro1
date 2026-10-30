import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tryGetPlanTransaction } from "../api/plan";
import { generateTokenByApiKey } from "../api/login";
import { useDispatch } from "react-redux";
import { IS_LOADING, SHOW_SNACKBAR } from "../utils/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SuccessPay = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const tenantId = searchParams.get("tenantId");
  const [token, setToken] = useState("");
  const [orderDetail, setOrderDetail] = useState();

  useEffect(() => {
    const keys = JSON.parse(process.env.REACT_APP_API_KEYS);
    const key = keys.find((f) => f.tenantId === tenantId);
    dispatch(
      generateTokenByApiKey(
        {},
        "zealthix",
        {
          "x-tenant-id": key.tenantId,
          "X-Api-Key": key.key,
          "Content-Type": "application/json",
        },
        (t) => {
          if (t.access_token) {
            setToken(t);
          }
        }
      )
    );
  }, []);


  const getTransaction = () => {
    dispatch({
      type: IS_LOADING,
      payload: { type: IS_LOADING, payload: true },
    });
    tryGetPlanTransaction(transactionId, token?.access_token).then((res) => {
      if (res?.status === "SUCCESS") {
        setOrderDetail(res);
        dispatch({
          type: IS_LOADING,
          payload: { type: IS_LOADING, payload: false },
        });
      } else {
        if (!res?.transactionId) {
          dispatch({
            type: SHOW_SNACKBAR,
            payload: {
              type: "error",
              message:
                (res?.data?.description
                  ? res?.data?.description
                  : res?.data?.message) ?? "Please contact with administrator",
              open: true,
            },
          });
        }
        dispatch({
          type: IS_LOADING,
          payload: { type: IS_LOADING, payload: false },
        });
      }
    });
  };

  useEffect(() => {
    if (token) {
      getTransaction();
    }
  }, [token]);

  return (
    <>
      {orderDetail?.status === "SUCCESS" && (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            {/* <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p> */}
            <div
              className="broker"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <div className="pb-2 text-center justify-center flex flex-col items-center gap-2 lottieFiles">
                <DotLottieReact
                  src="https://lottie.host/d9e78d76-07eb-4451-8248-8cc69cd747ce/kBHwmnleyx.lottie"
                  loop
                  autoplay
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifySelf: "center",
                }}
              >
                <h4
                  className="head"
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Congratulations <br />
                  <span style={{ fontWeight: 400 }}>
                    You have successfully purchased the Plan&nbsp;
                    <strong>{orderDetail?.planName}</strong>.
                  </span>
                </h4>
              </div>
              <p style={{ fontSize: 14, paddingTop: 7, textAlign: "center" }}>
                You will soon receive the app access credentials to unlock your
                plan and start benefiting from it. For any queries you can write
                to us at
                <strong> {orderDetail?.contactEmail} </strong>
              </p>
              {/* <div className="flex justify-center items-center mt-3">
            <a
              className="min-w-[76px] text-center mb-2 py-[13px] px-[20px] text-white font-medium text-[16px] linear-block transition-all ease-in-out rounded cursor-pointer hover:bg-[#6803EB]"
              href="https://zealthix.com/opd-plans"
              target="_top"
              rel="noopener noreferrer"
            >
              <i class="fa-solid fa-arrow-left mr-3"></i>
              Back to plan page
            </a>
          </div> */}
            </div>
          </div>
        </div>
      )}
      {orderDetail?.status === "FAILED" && (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <div
              className="broker"
              style={{
                backgroundColor: "#ffffff",
                marginBottom: 10,
                borderRadius: 5,
              }}
            >
              <div className="pb-2 text-center justify-center flex flex-col items-center gap-2 lottieFiles">
                <DotLottieReact
                  src="https://lottie.host/452c79d0-93d5-4b58-931c-57a632afd4ea/XExsmpOfBI.lottie"
                  loop
                  autoplay
                />
              </div>

              <h3 className="text-[18px] text-center font-[600] text-[#EA4335]">
                Payment Unsuccessful
              </h3>
              <p style={{ fontSize: 16, paddingTop: 7, textAlign: "center" }}>
                We regret to inform you that your recent payment attempt for the
                Plan
                <span className="mx-1" style={{ fontWeight: 600 }}>
                  {orderDetail?.planName}
                </span>
                was unsuccessful.
              </p>
              <div className="text-center text-[14px]">
                <p className="text-gray-500">Transaction Details:</p>
                <p>
                  <label className="text-gray-500 px-2">Amount:</label>
                  {orderDetail?.payableAmount}
                </p>
                <p>
                  <label className="text-gray-500 px-2">transaction ID:</label>
                  {orderDetail?.transactionId}
                </p>
                <p>
                  <label className="text-gray-500 px-2">Order ID:</label>
                  {orderDetail?.paymentOrderId}
                </p>
              </div>
              <p style={{ fontSize: 14, paddingTop: 7, textAlign: "center" }}>
                You will soon receive the app access credentials to unlock your
                plan and start benefiting from it. For any queries you can write
                to us at
                <a href="mailto:contact@zealthix.com" className="font-semibold">
                  
                  {orderDetail?.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPay;
