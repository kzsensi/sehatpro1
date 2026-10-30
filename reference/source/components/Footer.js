import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-brand-800 pt-16 pb-8">
      {/* subtle top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-600 via-brandGreen-500 to-brand-600" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 pb-12 lg:border-b lg:border-white/10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img
              src="/assets/images/sehatlogo.png"
              alt="SehatFirstPro"
              className="w-[180px] mb-5 rounded-xl bg-white p-2.5"
            />

            <p className="text-white/70 leading-relaxed text-[15px] max-w-sm">
              Sehatfirstpro supports individuals and families with accessible OPD and
              preventive wellness plans designed to make quality healthcare
              affordable and accessible.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold mb-5 text-white">Company</h3>

            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="/plans"
                  className="text-white/70 hover:text-brandGreen-400 transition-colors duration-200 inline-block"
                >
                  Plans
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-white/70 hover:text-brandGreen-400 transition-colors duration-200 inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>

            <h3 className="text-base font-bold mb-5 text-white">
              Terms &amp; Policies
            </h3>

            <ul className="space-y-3">
              {[
                ["Terms & Conditions", "/term-of-use"],
                ["Shipping & Delivery", "/shipping-delivery-policy"],
                ["Privacy Policy", "/privacy-policy"],
                ["Cancellation Policy", "/cancellation-policy"],
              ].map(([title, url]) => (
                <li key={title}>
                  <a
                    href={url}
                    className="text-white/70 hover:text-brandGreen-400 transition-colors duration-200 inline-block"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-base font-bold mb-5 text-white">Contact Us</h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                  🏠
                </div>

                <p className="text-white/70 text-[15px] leading-relaxed pt-1.5">
                  E-3/112, S-05, SHARDA COMPLEX, R.S. NAGAR, 
              
                  ARERA COLONY, Bhopal Madhya Pradesh 462039
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                  📧
                </div>

                <a
                  href="mailto:support@sehatfirstpro.com"
                  className="text-white/70 hover:text-brandGreen-400 transition-colors duration-200 text-[15px]"
                >
                  support@sehatfirstpro.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-center gap-3">
          <p className="text-white/50 text-sm text-center lg:text-left">
            ©SehatFirstPro 2026. All rights reserved.
          </p>

          <p className="text-white/50 text-sm text-center lg:text-right">
            In Association With
            <span className="font-semibold text-white/80"> AROGYA PULSE (OPC) PRIVATE LIMITED</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
