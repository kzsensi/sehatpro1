import { useSelector } from "react-redux";
import React from "react";

function ApiLoader() {
  const isApiLoading = useSelector(
    (state) => state.LoaderReducer.isApiLoading?.payload
  );
  const isPageLoading = useSelector(
    (state) => state.LoaderReducer.isPageLoading
  );
  return (
    isApiLoading === true &&
    !isPageLoading && (
      <>
        <div className="z-[9999999] fixed inset-0 bg-[#ffffff50] bg-opacity-50 gap-3 flex items-center justify-center">
          <div className="loader ease-linear h-20 w-20" />
        </div>
      </>
    )
  );
}

export default ApiLoader;
