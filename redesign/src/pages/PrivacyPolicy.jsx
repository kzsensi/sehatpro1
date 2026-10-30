import React from "react";

const PrivacyPolicy = () => {
  const policies = [
    {
      icon: "bi-shield-lock-fill",
      title: "Data Fiduciary Statement",
      tag: "DPDP Act 2023",
      desc: "Sehatfirstpro respects your privacy and acts as a Data Fiduciary for your health information, ensuring it is handled with the highest standards of care and compliance.",
    },
    {
      icon: "bi-database-fill",
      title: "Information We Collect",
      tag: "Data Collection",
      desc: "We collect Personal Information (name, email), Usage Data, and Device Information solely to provide and improve our Service experience for you.",
    },
    {
      icon: "bi-gear-fill",
      title: "How We Use Your Information",
      tag: "Data Usage",
      desc: "Your information is used to operate the Service, process transactions, deliver personalized experiences, and comply with applicable legal requirements.",
    },
    {
      icon: "bi-arrow-left-right",
      title: "Disclosure & Retention",
      tag: "Data Sharing",
      desc: "Information is shared with third-party providers strictly for service fulfilment. We retain data for the duration of your account or as required for legal audit purposes.",
    },
    {
      icon: "bi-person-lock",
      title: "Your Rights & Security",
      tag: "Data Rights",
      desc: "You may access and update your data through account settings. While we take all reasonable security steps, please note that no data transmission is 100% secure.",
    },
  ];

  return (
    <section  id="privacy">
      {/* Header */}
      <div >
        <span >
          <i  />
          Policies
        </span>
        <h1 >
          Privacy{" "}
          <span >
            Policy
            <span  />
          </span>
        </h1>
        <p >
          Strong privacy measures to keep your data safe, secure, and confidential.
        </p>
      </div>

      {/* Cards */}
      <div >
        {policies.map((item, i) => (
          <div
            key={i}
            
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* Left — icon + number */}
            <div >
              <div >
                <i  />
              </div>
              <span >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Right — content */}
            <div >
              <div >
                <h3 >
                  {item.title}
                </h3>
                <span >
                  {item.tag}
                </span>
              </div>
              <p >
                {item.desc}
              </p>
            </div>

            {/* Hover right accent */}
            <div  />
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div >
        <div >
          <div >
            <i  />
          </div>
          <p >
            For any privacy-related queries or data requests, please contact us at{" "}
            <a
              href="mailto:support@sehatfirstpro.com"
              
            >
              support@sehatfirstpro.com
            </a>
            . Our team will respond within 72 business hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
