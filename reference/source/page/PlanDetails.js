import React from "react";
import PaymentDetails from "./PlanPurchase/PaymentDetails";

const PlanDetails = () => {
  return (
    <div>
      <div
        className="services-details-area default-padding"
      >
        <div className="px-[3rem] max-[767px]:px-[16px]">
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
