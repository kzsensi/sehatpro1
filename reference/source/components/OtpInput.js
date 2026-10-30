import React, { useState, useRef } from "react";
import { VerifyOTP } from "../api/plan";
import { useDispatch } from "react-redux";
import { SHOW_SNACKBAR } from "../utils/types";

const OtpInput = ({
  verifyEmail,
  verifyPhone,
  setVerifyEmail,
  setVerifyPhone,
  setOpenVerify,
  token,
}) => {
  const dispatch = useDispatch();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState("");

  const handleInput = (e, index) => {
    const input = e.target;
    const value = input.value;
    const otpArray = otp.split("");
    otpArray[index] = value || "";
    setOtp(otpArray.join(""));

    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
    if (e.key === "Backspace" && !value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (verifyEmail?.type === "EMAIL") {
      dispatch(
        VerifyOTP(
          { type: verifyEmail?.type, verify: verifyEmail?.address, otp: otp },
          token?.access_token,
          (d) => {
            if (d?.verified) {
              setOpenVerify(false);
              setVerifyEmail({ verified: true });
            } else {
              dispatch({
                type: SHOW_SNACKBAR,
                payload: {
                  type: "error",
                  message: "Incorrect OTP. Please try again.",
                  open: true,
                },
              });
            }
          }
        )
      );
    } else if (verifyPhone?.type === "SMS") {
      dispatch(
        VerifyOTP(
          { type: verifyPhone?.type, verify: verifyPhone?.address, otp: otp },
          token?.access_token,
          (d) => {
            if (d?.verified) {
              setOpenVerify(false);
              setVerifyPhone({ verified: true });
            } else {
              dispatch({
                type: SHOW_SNACKBAR,
                payload: {
                  type: "error",
                  message: "Incorrect OTP. Please try again.",
                  open: true,
                },
              });
            }
          }
        )
      );
    }
  };

  return (
    <>
      <div className="flex justify-end px-6 pt-4">
        <i
          className="fa-solid fa-x cursor-pointer"
          onClick={() => setOpenVerify(false)}
        ></i>
      </div>
      <div className="bg-white shadow-lg rounded-lg px-8 pt-0 pb-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Enter OTP
        </h1>
        <p className="text-gray-600 text-center mb-6">
          We've sent a One-Time Password (OTP) to your
          <span>
            {verifyEmail?.type === "EMAIL"
              ? verifyEmail?.type.toLowerCase()
              : "phone"}
          </span>
          . Please enter it below to proceed.
        </p>

        <div className="flex gap-2 mb-6 justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg outline-none focus:outline-none focus:border-[#123B7C] focus:ring-2 focus:ring-[#123B7C]/20 transition-all"
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleInput(e, index)}
            />
          ))}
        </div>

        <button
          className="w-full bg-[#123B7C] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#0D2E63] transition-colors duration-200"
          onClick={handleSubmit}
        >
          Verify OTP
        </button>

        {/* <p className="text-sm text-gray-500 mt-4 text-center">
          Didn't receive the OTP?
          <a href="#" className="text-blue-500 hover:underline">
            Resend
          </a>
        </p> */}
      </div>
    </>
  );
};

export default OtpInput;
