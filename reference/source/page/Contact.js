import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendNotification } from "../api/plan";
import { SHOW_SNACKBAR } from "../utils/types";
import { generateTokenByApiKey } from "../api/login";
import { getEmailBody } from "../utils/helper";

const Contact = () => {
  const [notification, setNotification] = useState({}); 
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false); 
  const dispatch = useDispatch();

  const update = (field) => (e) =>
    setNotification((prev) => ({ ...prev, [field]: e.target.value }));

  const onSendEmail = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = notification;

    if (!name || !email || !phone || !subject || !message) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: { type: "error", message: "Please fill all required fields", open: true },
      });
      return;
    }

    const emailBody = getEmailBody(name, email, phone, message);
    const request = {
      notificationType: "EMAIL",
      from: process.env.REACT_APP_SENDER_EMAIL,
      subject: subject || "Contact Form Submission",
      toUsers: {
        [process.env.REACT_APP_TO_EMAIL]: { email: process.env.REACT_APP_TO_EMAIL },
      },
      body: emailBody,
    };

    setSending(true);
    dispatch(
      generateTokenByApiKey(
        {},
        "zealthix",
        {
          "x-tenant-id": process.env.REACT_APP_TENANT_ID,
          "X-Api-Key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        (t) => {
          if (t.access_token) {
            dispatch(
              sendNotification(request, t.access_token, () => {
                e.target.reset();
                setNotification({});
                setSending(false);
                setSent(true);
              })
            );
          } else {
            setSending(false);
          }
        }
      )
    );
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-[#F9FAFC] px-4 py-3 text-sm text-[#123B7C] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#123B7C] focus:bg-white focus:ring-2 focus:ring-[#123B7C]/20";

  const labelClass =
    "block text-[11px] font-semibold uppercase tracking-widest text-[#123B7C] mb-1.5";

  const infoItems = [
    {
      icon: "bi-telephone-fill",
      label: "Phone",
      content: (
        <div className="flex flex-col gap-0.5">
          {/* <a
            href="tel:+917081003111"
            className="text-sm font-medium text-[#123B7C] hover:text-[#123B7C] transition-colors"
          >
            +91 70810 03111{" "}
            <span className="text-xs font-normal text-gray-400">(Male)</span>
          </a> */}
          <a
            href="tel:+9425005087"
            className="text-sm font-medium text-[#123B7C] hover:text-[#123B7C] transition-colors"
          >
            +91 9425005087{" "}
            <span className="text-xs font-normal text-gray-400">(Female)</span>
          </a>
        </div>
      ),
    },
    {
      icon: "bi-envelope-fill",
      label: "Email",
      content: (
        <a
          href="mailto:support@sehatfirstpro.com"
          className="text-sm font-medium text-[#123B7C] hover:underline"
        >
          support@sehatfirstpro.com
        </a>
      ),
    },
    {
      icon: "bi-geo-alt-fill",
      label: "Address",
      content: (
        <p className="text-sm text-[#123B7C] leading-relaxed">
          E-3/112, S-05, SHARDA COMPLEX, R.S. NAGAR, ARERA COLONY, Bhopal


          <br />
          Madhya Pradesh
462039
        </p>
      ),
    },
    {
      icon: "bi-clock-fill",
      label: "Working Hours",
      content: (
        <p className="text-sm text-[#123B7C]">
          Mon – Sat,{" "}
          <span className="font-semibold">9 AM – 6 PM IST</span>
          <br />
          <span className="text-xs text-gray-400">
            Response within 72 business hours
          </span>
        </p>
      ),
    },
  ];

  return (
    <section className="py-16 px-4 cu_mtpd" id="contact">
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#EEF3FB] text-[#123B7C] text-[13px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <i className="bi bi-headset text-sm" />
          Support Centre
        </span>

        <h2 className="text-4xl sm:text-5xl font-bold text-[#123B7C] mb-3 leading-tight">
          Get in{" "}
          <span className="relative inline-block">
            Touch
            {/* teal underline accent */}
            <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#123B7C]" />
          </span>
        </h2>
        <p className="text-gray-500 text-base lg:text-[18px] max-w-md mx-auto leading-relaxed">
          Dedicated support to make your healthcare experience seamless and
          stress-free.
        </p>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        <div className="lg:col-span-2 flex flex-col gap-4">

          <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#4E75B8] to-[#123B7C]" />

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-5 py-4 text-[14px] ${
                  i !== infoItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#EEF3FB] flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${item.icon} text-[#123B7C] text-base`} />
                </div>
                <div className="text-[14px]">
                  <p className=" font-bold uppercase tracking-widest text-gray-700 mb-1">
                    {item.label}
                  </p>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: Form ── */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-7 sm:p-8">

            {/* Form header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4E75B8] to-[#123B7C] flex items-center justify-center">
                <i className="bi bi-send-fill text-white text-base" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#123B7C] leading-none">
                  Send us a message
                </h3>
                <p className="text-base text-gray-600 mt-0.5">
                  We'll respond within 72 business hours
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#4E75B8]/30 via-[#123B7C]/30 to-transparent mb-6" />

            <form onSubmit={onSendEmail} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="c-name">
                    Full name <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputClass}
                    id="c-name"
                    type="text"
                    placeholder="Your full name"
                    value={notification?.name || ""}
                    required
                    onChange={update("name")}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="c-phone">
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputClass}
                    id="c-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={notification?.phone || ""}
                    required
                    onChange={update("phone")}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className={labelClass} htmlFor="c-email">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  className={inputClass}
                  id="c-email"
                  type="email"
                  placeholder="you@example.com"
                  value={notification?.email || ""}
                  required
                  onChange={update("email")}
                />
              </div>

              {/* Row 3 */}
              <div>
                <label className={labelClass} htmlFor="c-subject">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  className={inputClass}
                  id="c-subject"
                  type="text"
                  placeholder="How can we help you?"
                  value={notification?.subject || ""}
                  required
                  onChange={update("subject")}
                />
              </div>

              {/* Row 4 */}
              <div>
                <label className={labelClass} htmlFor="c-message">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  className={`${inputClass} resize-none`}
                  id="c-message"
                  rows={5}
                  placeholder="Tell us more about your query…"
                  value={notification?.message || ""}
                  required
                  onChange={update("message")}
                />
              </div>

              {/* Submit / Success */}
              {sent ? (
                <div className="flex items-center gap-3 rounded-xl bg-[#EEF3FB] border border-[#123B7C]/30 px-5 py-4">
                  <div className="w-9 h-9 rounded-full bg-[#123B7C] flex items-center justify-center flex-shrink-0">
                    <i className="bi bi-check-lg text-white text-base" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#123B7C]">
                      Message sent successfully!
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      We'll get back to you within 72 business hours.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#4E75B8] to-[#123B7C] px-6 py-3.5 text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:from-[#294E93] hover:to-[#0D2E63] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill text-sm" />
                      Send Message
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;