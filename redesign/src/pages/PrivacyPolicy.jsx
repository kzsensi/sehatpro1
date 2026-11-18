import PolicyDocument from './PolicyDocument';

const policies = [
  {
    title: "Data Fiduciary Statement",
    tag: "DPDP Act 2023",
    desc: "Sehatfirstpro respects your privacy and acts as a Data Fiduciary for your health information, ensuring it is handled with the highest standards of care and compliance.",
  },
  {
    title: "Information We Collect",
    tag: "Data Collection",
    desc: "We collect Personal Information (name, email), Usage Data, and Device Information solely to provide and improve our Service experience for you.",
  },
  {
    title: "How We Use Your Information",
    tag: "Data Usage",
    desc: "Your information is used to operate the Service, process transactions, deliver personalized experiences, and comply with applicable legal requirements.",
  },
  {
    title: "Disclosure & Retention",
    tag: "Data Sharing",
    desc: "Information is shared with third-party providers strictly for service fulfilment. We retain data for the duration of your account or as required for legal audit purposes.",
  },
  {
    title: "Your Rights & Security",
    tag: "Data Rights",
    desc: "You may access and update your data through account settings. While we take all reasonable security steps, please note that no data transmission is 100% secure.",
  },
];

export default function PrivacyPolicy() {
  return <PolicyDocument id="privacy" title="Privacy policy" sections={policies}>
    <p>For any privacy-related queries or data requests, please contact us at{' '}
      <a href="mailto:support@sehatfirstpro.com">support@sehatfirstpro.com</a>. Our team will respond within 72 business hours.</p>
  </PolicyDocument>;
}
