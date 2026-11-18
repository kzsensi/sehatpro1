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
    <section  id="cancellation">
      {/* Header */}
      <div >
        <span >
          <i  />
          Policies
        </span>
        <h1 >
          Cancellation{" "}
          <span >
            Policy
            <span  />
          </span>
        </h1>
        <p >
          Flexible plans backed by clear and customer-friendly cancellation terms.
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
            {/* Ghost number watermark */}
            <span
              
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon row */}
            <div >
              <div
                
              >
                <i
                  
                />
              </div>
              <span
                
              >
                {item.tag}
              </span>
            </div>

            {/* Text */}
            <div>
              <h3
                
              >
                {item.title}
              </h3>
              <p
                
              >
                {item.desc}
              </p>
            </div>

            {/* Bottom accent */}
            <div
              
            />
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
            For cancellation or refund requests, please write to us at{" "}
            <a
              href="mailto:support@sehatfirstpro.com"
              
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
