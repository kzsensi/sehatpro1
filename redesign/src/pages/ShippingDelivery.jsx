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
    <section  id="shipping">
      {/* Header */}
      <div >
        <span >
          <i  />
          Policies
        </span>
        <h1 >
          Shipping &{" "}
          <span >
            Delivery
            <span  />
          </span>
        </h1>
        <p >
          Efficient shipping & delivery policies to ensure on-time service delivery.
        </p>
      </div>

      {/* Cards grid */}
      <div >
        {policies.map((item, i) => (
          <div
            key={i}
            
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {/* Number + Icon row */}
            <div >
              <div >
                <i  />
              </div>
              <span >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Text */}
            <div>
              <h3 >
                {item.title}
              </h3>
              <p >
                {item.desc}
              </p>
            </div>

            {/* Bottom teal accent bar */}
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
            For any shipping or delivery related queries, please reach out to us at{" "}
            <a
              href="mailto:support@sehatfirstpro.com"
              
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
