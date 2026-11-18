import PolicyDocument from './PolicyDocument';

const policies = [
  {
    title: "Empanelled Providers",
    desc: "Service orders are fulfilled by empanelled providers through qualified and verified technicians.",
  },
  {
    title: "Registered Shipping",
    desc: "Product orders are shipped via registered domestic courier or speed post for reliable delivery.",
  },
  {
    title: "Delivery Timeline",
    desc: "Shipping occurs within 0–7 days of order confirmation, or as per the mutually agreed delivery date.",
  },
  {
    title: "Handover Guarantee",
    desc: "While we are not liable for courier delays, we guarantee order handover to the courier within 0–7 days.",
  },
  {
    title: "Buyer's Address",
    desc: "Delivery is made strictly to the address provided by the buyer at the time of placing the order.",
  },
  {
    title: "Delivery Confirmation",
    desc: "Service delivery is confirmed via a notification sent to your registered email ID.",
  },
];

export default function ShippingDelivery() {
  return <PolicyDocument id="shipping" title="Shipping & delivery" sections={policies}>
    <p>For any shipping or delivery related queries, please reach out to us at{' '}
      <a href="mailto:support@sehatfirstpro.com">support@sehatfirstpro.com</a>. Our support team is available Mon–Sat, 9 AM – 6 PM IST.</p>
  </PolicyDocument>;
}
