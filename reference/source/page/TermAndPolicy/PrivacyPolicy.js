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
    <section className="cu_mtpd py-16 px-4" id="privacy">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#EEF3FB] text-[#123B7C] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <i className="bi bi-shield-check text-sm" />
          Policies
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#123B7C] mb-3 leading-tight">
          Privacy{" "}
          <span className="relative inline-block">
            Policy
            <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#123B7C]" />
          </span>
        </h2>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Strong privacy measures to keep your data safe, secure, and confidential.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        {policies.map((item, i) => (
          <div
            key={i}
            className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#123B7C]/30 transition-all duration-300 p-6 flex items-start gap-5"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* Left — icon + number */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4E75B8] to-[#123B7C] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <i className={`bi ${item.icon} text-white text-lg`} />
              </div>
              <span className="text-xs font-black text-[#123B7C]/30 leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Right — content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="text-base font-bold text-[#123B7C]">
                  {item.title}
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#EEF3FB] text-[#123B7C] px-2.5 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Hover right accent */}
            <div className="self-stretch w-0.5 rounded-full bg-gray-100 group-hover:bg-[#123B7C] transition-colors duration-500 flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="rounded-2xl bg-[#EEF3FB] border border-[#123B7C]/20 px-6 py-4 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-[#123B7C] flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="bi bi-info-lg text-white text-base" />
          </div>
          <p className="text-[15px] text-[#123B7C] leading-relaxed">
            For any privacy-related queries or data requests, please contact us at{" "}
            <a
              href="mailto:support@sehatfirstpro.com"
              className="font-semibold text-[#123B7C] hover:underline"
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