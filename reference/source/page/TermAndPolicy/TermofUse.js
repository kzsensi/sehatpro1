import React from "react";

const SECTIONS = [
  {
    title: "Definitions",
    items: [
      <><strong>“You”</strong> refers to the individual or entity accessing or using the Website or Service.</>,
      <><strong>“Content”</strong> refers to any information, data, text, software, code, or other materials.</>,
      <><strong>“User”</strong> refers to any individual or entity who accesses or uses the Website or Service.</>,
      <><strong>“Service Provider”</strong> refers to the independent, third-party medical professionals, doctors, and labs empanelled to fulfil requests.</>,
    ],
  },
  {
    title: "Nature of Service & Intermediary Status",
    items: [
      <><strong>Technology Platform:</strong> sehatfirstpro provides a SaaS-based health-tech infrastructure.</>,
      <><strong>Aggregator Status:</strong> sehatfirstpro acts strictly as an Intermediary. We do not provide medical advice or treatment directly. The contract for medical service is strictly between the User and the Service Provider.</>,
    ],
  },
  {
    title: "Use of the Website and Service",
    items: [
      "You may only use the Service for lawful purposes.",
      "You agree not to damage or impair the Service, interfere with other users, gain unauthorized access, or upload objectionable/unlawful content.",
      "You agree not to violate any applicable laws or regulations.",
    ],
  },
  {
    title: "User Content",
    items: [
      "You are solely responsible for any content you upload.",
      "You grant sehatfirstpro a royalty-free license to use and distribute your content in connection with the Service.",
    ],
  },
  {
    title: "Intellectual Property",
    items: [
      "The Website and Service are protected by copyright and trademark laws.",
      "You agree not to remove or alter proprietary notices.",
    ],
  },
  {
    title: "Disclaimers",
    items: [
      'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.',
      "WE DISCLAIM ALL WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.",
      <><strong>MEDICAL DISCLAIMER: </strong>sehatfirstpro IS NOT RESPONSIBLE FOR CLINICAL OUTCOMES OR MEDICAL NEGLIGENCE BY THIRD-PARTY PROVIDERS.</>,
    ],
  },
  {
    title: "Telemedicine Consent & Compliance",
    items: [
      "By using Tele-Consultation, you provide voluntary consent to remote care.",
      "Per Indian Telemedicine Practice Guidelines 2020, you must provide valid ID and accurate age before the session begins.",
    ],
  },
  {
    title: "Pandemic & Force Majeure Exclusion",
    items: [
      "sehatfirstpro is not liable for failures beyond its control.",
      <><strong>Pandemic Clause:</strong> Plan benefits are <strong>not applicable or guaranteed</strong> during declared pandemics (e.g., COVID-19 or equivalent), epidemics, or natural disasters. Decision-making regarding service fulfilment during such events rests solely with sehatfirstpro.</>,
    ],
  },
  {
    title: "Limitation of Liability & Claim Cap",
    items: [
      "sehatfirstpro SHALL NOT BE LIABLE FOR INDIRECT OR CONSEQUENTIAL DAMAGES.",
      "The Company’s total liability for any claim shall not exceed the Plan Price paid by the User.",
    ],
  },
  {
    title: "Age Eligibility & Plan Limits",
    items: [
      <><strong>Group Insurance/Accident Rider:</strong> Limited to the primary holder aged 18-65 years under relevant plan(s) only.</>,
      <><strong>OPD Wellness Benefits:</strong> Available for members aged 0-85 years.</>,
    ],
  },
  {
    title: "Term and Termination",
    items: [
      "Terms remain in effect until terminated by you or sehatfirstpro.",
      "We may terminate at any time upon written notice.",
      "You may terminate by discontinuing use of the Service.",
    ],
  },
  {
    title: "Governing Law & Jurisdiction",
    items: [
      "These Terms are governed by the laws of India.",
      "All disputes are subject to the exclusive jurisdiction of the courts in Varanasi",
    ],
  },
  {
    title: "Entire Agreement, Severability, & Waiver",
    items: [
      "These Terms constitute the entire agreement.",
      "If any provision is held invalid, the remaining provisions remain in effect.",
      "No waiver of a provision shall be deemed a continuing waiver.",
    ],
  },
  {
    title: "Update to Terms",
    items: [
      "sehatfirstpro may update Terms at any time by posting on the Website.",
      "Continued use constitutes acceptance of amended Terms.",
      "If you have any questions about these terms, please contact us at support@sehatfirstpro.com",
    ],
  },
  {
    title: "Grievance Redressal",
    intro: "In compliance with the Information Technology Act and DPDP Act, for any grievances, please contact our Grievance Officer:",
    items: [
      <><strong>Email: </strong> support@sehatfirstpro.com</>,
      <><strong>Acknowledgment: </strong> Within 72 hours of working days.</>,
      <><strong>Resolution: </strong> Estimated Within 45-60 days.</>,
    ],
  },
  {
    title: "Disclaimers",
    items: [
      "Valid ID proof is mandatory for all consultations",
      "Processing fee will be deducted for any plan cancellations",
      "Medicine bill – 20% discount by sehatfirstpro app. Home Delivery for minimum order worth amount: ₹425/-",
      "sehatfirstpro will be responsible only for our own prescribed centres / shops for lab, medical store or health check up.",
      "For my choice (in person visit) - Doctor's prescription, Reports, reports bill and Medicine bills to be uploaded at site where applicable.",
      '"For any rider based plan refund, surrender charges will be applicable."',
    ],
  },
];

const TermofUse = () => {
  return (
    <section className="cu_mtpd py-16 px-4" id="pricing">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[#EEF3FB] text-[#123B7C] text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <i className="bi bi-receipt text-sm" />
          Terms &amp; Conditions
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#123B7C] mb-3 leading-tight">
          Terms &{" "}
          <span className="relative inline-block">
            Conditions
            <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-[#123B7C]" />
          </span>
        </h2>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          Well-Defined Terms & Conditions for Trust and Transparency
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        {SECTIONS.map((section, si) => (
          <div
            key={si}
            className={`py-6 ${si !== 0 ? "border-t border-gray-100" : "pt-0"}`}
            data-aos="fade-up"
            data-aos-delay={Math.min(si * 40, 300)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#EEF3FB] text-[#123B7C] text-sm font-bold flex items-center justify-center">
                {si + 1}
              </span>
              <h3 className="text-lg font-bold text-[#123B7C]">{section.title}</h3>
            </div>

            {section.intro && (
              <p className="text-[15px] text-gray-600 leading-relaxed mb-3 pl-11">
                {section.intro}
              </p>
            )}

            <ul className="space-y-2.5 pl-11 list-disc marker:text-[#123B7C]/50">
              {section.items.map((item, ii) => (
                <li key={ii} className="text-[15px] text-gray-600 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermofUse;
