import PolicyDocument from './PolicyDocument';

const policies = [
  {
    title: "Seven-Day Free Look",
    tag: "Full Refund",
    highlight: true,
    desc: "Annual plans may be cancelled for a full refund within 7 days of purchase, provided no services or wallet credits have been used.",
  },
  {
    title: "General Cancellations",
    tag: "7-Day Window",
    highlight: false,
    desc: "Cancellation requests are considered within 7 days of the order date. No cancellations apply once vendors have initiated shipping or service delivery.",
  },
  {
    title: "Deficiency Refunds",
    tag: "Quality Guarantee",
    highlight: false,
    desc: "Refunds or replacements are granted if the quality of service is proven poor. Issues must be reported within 7 days of receipt for eligibility.",
  },
  {
    title: "Refund Processing",
    tag: "45–60 Days",
    highlight: false,
    desc: "Once approved, refunds are processed and credited back to your original payment method within 45–60 business days.",
  },
];

export default function Cancellation() {
  return <PolicyDocument id="cancellation" title="Cancellation policy" sections={policies}>
    <p>For cancellation or refund requests, please write to us at{' '}
      <a href="mailto:support@sehatfirstpro.com">support@sehatfirstpro.com</a> within the applicable window. Processing fees may apply for rider-based plans.</p>
  </PolicyDocument>;
}
