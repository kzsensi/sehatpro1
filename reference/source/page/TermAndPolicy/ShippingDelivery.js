import React from "react";

const ShippingDelivery = () => {
  const policies = [
    {
      icon: "bi-people-fill",
      title: "Empanelled Providers",
      desc: "Service orders are fulfilled by empanelled providers through qualified and verified technicians.",
    },
    {
      icon: "bi-box-seam-fill",
      title: "Registered Shipping",
      desc: "Product orders are shipped via registered domestic courier or speed post for reliable delivery.",
    },
    {
      icon: "bi-calendar-check-fill",
      title: "Delivery Timeline",
      desc: "Shipping occurs within 0–7 days of order confirmation, or as per the mutually agreed delivery date.",
    },
    {
      icon: "bi-shield-check",
      title: "Handover Guarantee",
      desc: "While we are not liable for courier delays, we guarantee order handover to the courier within 0–7 days.",
    },
    {
      icon: "bi-geo-alt-fill",
      title: "Buyer's Address",
      desc: "Delivery is made strictly to the address provided by the buyer at the time of placing the order.",
    },
    {
      icon: "bi-envelope-check-fill",
      title: "Delivery Confirmation",
      desc: "Service delivery is confirmed via a notification sent to your registered email ID.",
    },
  ];

  return (
    <section className="cu_mtpd py-16 px-4" id="shipping">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#EEF3FB] text-[#123B7C] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <i className="bi bi-truck text-sm" />
          Policies
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#123B7C] mb-3 leading-tight">
          Shipping &{" "}
          <span className="relative inline-block">
            Delivery
            <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#123B7C]" />
          </span>
        </h2>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Efficient shipping & delivery policies to ensure on-time service delivery.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {policies.map((item, i) => (
          <div
            key={i}
            className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#123B7C]/30 transition-all duration-300 p-6 flex flex-col gap-4"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* Number + Icon row */}
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4E75B8] to-[#123B7C] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <i className={`bi ${item.icon} text-white text-lg`} />
              </div>
              <span className="text-4xl font-black text-[#123B7C]/15 leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-base font-bold text-[#123B7C] mb-1.5">
                {item.title}
              </h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Bottom teal accent bar */}
            <div className="mt-auto h-0.5 w-8 rounded-full bg-[#123B7C] group-hover:w-full transition-all duration-500" />
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
            For any shipping or delivery related queries, please reach out to us at{" "}
            <a
              href="mailto:support@sehatfirstpro.com"
              className="font-semibold text-[#123B7C] hover:underline"
            >
              support@sehatfirstpro.com
            </a>
            . Our support team is available Mon–Sat, 9 AM – 6 PM IST.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShippingDelivery;