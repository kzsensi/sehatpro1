import React from "react";

const Cancellation = () => {
  const policies = [
    {
      icon: "bi-calendar2-check-fill",
      title: "Seven-Day Free Look",
      tag: "Full Refund",
      highlight: true,
      desc: "Annual plans may be cancelled for a full refund within 7 days of purchase, provided no services or wallet credits have been used.",
    },
    {
      icon: "bi-arrow-counterclockwise",
      title: "General Cancellations",
      tag: "7-Day Window",
      highlight: false,
      desc: "Cancellation requests are considered within 7 days of the order date. No cancellations apply once vendors have initiated shipping or service delivery.",
    },
    {
      icon: "bi-patch-check-fill",
      title: "Deficiency Refunds",
      tag: "Quality Guarantee",
      highlight: false,
      desc: "Refunds or replacements are granted if the quality of service is proven poor. Issues must be reported within 7 days of receipt for eligibility.",
    },
    {
      icon: "bi-hourglass-split",
      title: "Refund Processing",
      tag: "45–60 Days",
      highlight: false,
      desc: "Once approved, refunds are processed and credited back to your original payment method within 45–60 business days.",
    },
  ];

  return (
    <section className="cu_mtpd py-16 px-4" id="cancellation">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#EEF3FB] text-[#123B7C] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <i className="bi bi-receipt text-sm" />
          Policies
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#123B7C] mb-3 leading-tight">
          Cancellation{" "}
          <span className="relative inline-block">
            Policy
            <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#123B7C]" />
          </span>
        </h2>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Flexible plans backed by clear and customer-friendly cancellation terms.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {policies.map((item, i) => (
          <div
            key={i}
            className={`group rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4 relative overflow-hidden ${
              item.highlight
                ? "bg-gradient-to-br from-[#123B7C] to-[#294E93] border-[#4E75B8]/40"
                : "bg-white border-gray-100 hover:border-[#123B7C]/30"
            }`}
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* Ghost number watermark */}
            <span
              className={`absolute -bottom-3 -right-2 text-7xl font-black select-none leading-none ${
                item.highlight ? "text-white/10" : "text-[#123B7C]/10"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon row */}
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 ${
                  item.highlight
                    ? "bg-white/20"
                    : "bg-gradient-to-br from-[#4E75B8] to-[#123B7C]"
                }`}
              >
                <i
                  className={`bi ${item.icon} text-lg ${
                    item.highlight ? "text-white" : "text-white"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  item.highlight
                    ? "bg-white/20 text-white"
                    : "bg-[#EEF3FB] text-[#123B7C]"
                }`}
              >
                {item.tag}
              </span>
            </div>

            {/* Text */}
            <div>
              <h3
                className={`text-base font-bold mb-2 ${
                  item.highlight ? "text-white" : "text-[#123B7C]"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-[15px] leading-relaxed ${
                  item.highlight ? "text-white/80" : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>

            {/* Bottom accent */}
            <div
              className={`mt-auto h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-full ${
                item.highlight ? "bg-white/40" : "bg-[#123B7C]"
              }`}
            />
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
            For cancellation or refund requests, please write to us at{" "}
            <a
              href="mailto:support@sehatfirstpro.com"
              className="font-semibold text-[#123B7C] hover:underline"
            >
              support@sehatfirstpro.com
            </a>{" "}
            within the applicable window. Processing fees may apply for rider-based plans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cancellation;