import { Route, Routes } from "react-router-dom";
import ApiLoader from './components/ApiLoader';
import Snackbar from './components/Snackbar';
import PlanDetails from './page/PlanDetails';
import PlanPage from './page/PlanPage';
import Contact from './page/Contact';
import PrivacyPolicy from './page/TermAndPolicy/PrivacyPolicy';
import ShippingDelivery from './page/TermAndPolicy/ShippingDelivery';
import Cancellation from './page/TermAndPolicy/Cancellation';
import HomePage from './page/HomePage';
import TermofUse from './page/TermAndPolicy/TermofUse';
import { useEffect } from "react";
import { setTheme } from "./utils/helper";
import PaymentDetails from "./page/PlanPurchase/PaymentDetails";
import MainRoute from "./MainRoute";
import Header from "./components/Header";
import SuccessPay from "./page/SuccessPay";

function App() {
  useEffect(() => {
    setTheme({
      "text": "#ffffff",
      "btnText": "#ffffff",
      "cardGrad1": "#123B7C",
      "cardGrad2": "#16A34A",
      "policyHide": false
    });
  }, []);

  return (
    <>
      <Snackbar />
      <ApiLoader />
      <Routes>
        {/* Routes using MainRoute layout */}
        <Route element={<MainRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cancellation-policy" element={<Cancellation />} />
          <Route path="/term-of-use" element={<TermofUse />} />
          <Route path="/shipping-delivery-policy" element={<ShippingDelivery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<PlanPage />} />
          <Route path="/opd-payments" element={<PlanDetails />} />
          <Route path="/opd-payments.html" element={<PlanDetails />} />
          <Route path="/payment" element={<SuccessPay />} />
        </Route>
        {/* <Route path="/test" element={<Header />}/> */}

        {/* Routes without layout */}
        <Route path="/plan-purchase/payment-detail" element={<PaymentDetails />} />
      </Routes>
    </>
  );
}

export default App;