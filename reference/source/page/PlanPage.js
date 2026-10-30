import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import BuyPlan from "./PlanPurchase/BuyPlan";
import Tooltip from "../components/Tooltip";

// ─── Switch ──────────────────────────────────────────────────────────────────
const Switch = React.forwardRef(
  ({ checked: controlledChecked, onCheckedChange, defaultChecked = false, disabled = false, size = "md", ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checkedState = isControlled ? controlledChecked : internalChecked;

    const handleToggle = () => {
      if (disabled) return;
      const next = !checkedState;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleToggle(); }
    };

    const sizes = {
      sm: { track: { width: 40, height: 24 }, thumb: 20, checkedX: 18, uncheckedX: 2 },
      md: { track: { width: 56, height: 32 }, thumb: 28, checkedX: 24, uncheckedX: 2 },
      lg: { track: { width: 72, height: 40 }, thumb: 36, checkedX: 32, uncheckedX: 2 },
    };
    const s = sizes[size] || sizes.md;

    const thumbVariants = {
      tap: { width: s.thumb + 4, x: checkedState ? s.checkedX - 2 : s.uncheckedX, transition: { duration: 0.15 } },
      checked: { x: s.checkedX, width: s.thumb, transition: { type: "spring", stiffness: 500, damping: 35 } },
      unchecked: { x: s.uncheckedX, width: s.thumb, transition: { type: "spring", stiffness: 500, damping: 35 } },
    };
    const trackVariants = {
      checked: { backgroundColor: "#123B7C" },
      unchecked: { backgroundColor: "#d1d5db" },
    };

    return (
      <motion.button
        ref={ref} role="switch" type="button" aria-checked={checkedState}
        disabled={disabled} onClick={handleToggle} onKeyDown={handleKeyDown}
        animate={checkedState ? "checked" : "unchecked"}
        whileTap={!disabled ? "tap" : undefined}
        variants={trackVariants} transition={{ duration: 0.2 }}
        style={{ display: "inline-flex", alignItems: "center", width: s.track.width, height: s.track.height, flexShrink: 0, borderRadius: 9999, position: "relative", border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, outline: "none", WebkitTapHighlightColor: "transparent" }}
        {...props}
      >
        <motion.span
          initial={{ x: defaultChecked ? s.checkedX : s.uncheckedX }}
          variants={thumbVariants}
          style={{ display: "block", height: s.thumb, backgroundColor: "#ffffff", borderRadius: 9999, boxShadow: "0 2px 6px rgba(0,0,0,0.25)", position: "absolute", top: (s.track.height - s.thumb) / 2 }}
        />
      </motion.button>
    );
  }
);
Switch.displayName = "Switch";



const PLANS_META = [
  {
    id: 1,
    name: "Wellness First",
    price: "₹999",
    coverage: "Individual",
    benefits: [
      "4 Teleconsultation - General Physician(Instant)",
      "4 Teleconsultation - Ayurveda",
      "4 Teleconsultation - Homeopathy",
      "2 Teleconsultation - Choose from 18 Specialist",
      "2 Teleconsultation - Emotional Wellness",
      "1 Teleconsultation -  Dietician",
      "2 Video Consultation - General Physician",
      // "1 Annual Health Checkup(Basic) - At Doorstep sample collection",
      // "₹1,000 Wallet Amount for Diagnostic Test and Packages",
      "1 Dental Checkup & Consultation",
      // "1 Pet Health Video Consultation",
    ],
    eligibility: "Valid for individuals aged 18–85.",
    value_added_features: [
      "Unlimited Risk Assessment",
      "Unlimited Health Reminder",
      "Unlimited Recorded Fitness sessions",
    ],
    platform_benefits: [
      "Upto 50% off on diagnostic test & packages (20,000 diagnostics test up 50% discount)",
      "Upto 20% off on prescribed medicines",
    ],
    // personal_accidents: ["Upto 15lakh coverage"],
    planCode: "wellnessfirst",
  },
  {
    id: 2,
    name: "Wellness Essential",
    price: "₹3499",
    coverage: "Individual",
    benefits: [
      "8 Teleconsultation - General Physician(Instant)",
      "8 Teleconsultation - Ayurveda",
      "8 Teleconsultation - Homeopathy",
      "2 Teleconsultation - Choose from 18 Specialist",
      "4 Teleconsultation - Emotional Wellness",
      "2 Teleconsultation -  Dietician",
      "4 Video Consultation - General Physician",
      "1 Annual Health Checkup(Basic) - At Doorstep sample collection",
      // "2 In-person General Physician Clinic Consultaion or Reimbursement upto ₹300 per Consultation for My Choice Doctor",
      "1 Dental Checkup & Consultation",
      "1 Pet Health Video Consultation",
    ],
    eligibility: "Valid for individuals aged 18–85.",
    value_added_features: [
      "Unlimited Risk Assessment",
      "Unlimited Health Reminder",
      "Unlimited Recorded Fitness sessions",
    ],
    platform_benefits: [
      "Upto 50% off on diagnostic test & packages (20,000 diagnostics test up 50% discount)",
      "Upto 20% off on prescribed medicines",
    ],
    // personal_accidents: ["Upto 15lakh coverage"],
    planCode: "wellnessessential",
  },
  // {
  //   id: 3,
  //   name: "Wellness Essential PLus",
  //   price: "₹3999",
  //   coverage: "Individual",
  //   benefits: [
  //     "8 Teleconsultation - General Physician(Instant)",
  //     "8 Teleconsultation - Ayurveda",
  //     "8 Teleconsultation - Homeopathy",
  //     "2 Teleconsultation - Choose from 18 Specialist",
  //     "4 Teleconsultation - Emotional Wellness",
  //     "2 Teleconsultation -  Dietician",
  //     "4 Video Consultation - General Physician",
  //     "1 Annual Health Checkup(Basic) - At Doorstep sample collection",
  //     // "6 Consultations on In-person General Physician Clinic or Reimbursement upto ₹300 per Consultation for My Choice Doctor",
  //     "1 Dental Checkup & Consultation",
  //     "1 Pet Health Video Consultation",
  //   ],
  //   eligibility: "Valid for individuals aged 18–65.",
  //   value_added_features: [
  //     "Unlimited Risk Assessment",
  //     "Unlimited Health Reminder",
  //     "Unlimited Recorded Fitness sessions",
  //   ],
  //   // group_personal_accidental_rider: [
  //   //   "Sum Insured",
  //   //   "Accidental Death",
  //   //   "Permanent Total Disability (Upto 100% SI Paid on PTD)",
  //   // ],
  //   platform_benefits: [
  //     "Upto 50% off on diagnostic test & packages (20,000 diagnostics test up 50% discount)",
  //     "Upto 20% off on prescribed medicines",
  //   ],
  //   // personal_accidents: ["Upto 15lakh coverage - Primary Member"],
  //   // accident_dealth: ["15L (Primary Member Only)"],
  //   planCode: "wellnessessentialplus",
  // },
  {
    id: 4,
    name: "Wellness Advantage",
    price: "₹4999",
    coverage: "Individual",
    benefits: [
      "8 Teleconsultation - General Physician(Instant)",
      "8 Teleconsultation - Ayurveda",
      "8 Teleconsultation - Homeopathy",
      "4 Teleconsultation - Choose from 18 Specialist",
      "4 Teleconsultation - Emotional Wellness",
      "4 Teleconsultation -  Dietician",
      "6 Video Consultation - General Physician",
      "1 Annual Health Checkup(Basic) - At Doorstep sample collection",
      "2 Consultations on In-person General Physician Clinic or Hospital Consultation for My Choice Doctor",
      "2 Dental Checkup & Consultation",
      "2 Pet Health Video Consultation",
    ],
    eligibility: "Valid for individuals aged 18–85.",
    value_added_features: [
      "Risk Assessment",
      "Health Reminder",
      "Recorded Fitness sessions",
    ],
    // group_personal_accidental_rider: [
    //   "Sum Insured",
    //   "Accidental Death",
    //   "Permanent Total Disability (Upto 100% SI Paid on PTD)",
    // ],
    // accident_dealth: ["15L (Primary Member Only)"],
    platform_benefits: [
      "Upto 50% off on diagnostic test & packages (20,000 diagnostics test up 50% discount)",
      "Upto 20% off on prescribed medicines",
    ],
    planCode: "wellnessadvantage",
  },
  {
    id: 5,
    name: "Wellness Elite",
    price: "₹6499",
    coverage: "Family - 2 Adults + 2 Children",
    benefits: [
      "12 Teleconsultation - General Physician(Instant)",
      "12 Teleconsultation - Ayurveda",
      "12 Teleconsultation - Homeopathy",
      "6 Teleconsultation - Choose from 18 Specialist",
      "4 Teleconsultation - Emotional Wellness",
      "4 Teleconsultation -  Dietician",
      "8 Video Consultation - General Physician",
      "1 Annual Health Checkup(Basic) - At Doorstep sample collection",
      "6 Consultations on In-person General Physician Clinic or Hospital Consultation for My Choice Doctor",
      "2 Dental Checkup & Consultation",
      "2 Pet Health Video Consultation",
    ],
    eligibility: "Valid for individuals aged 18–85.",
    value_added_features: [
      "Risk Assessment",
      "Health Reminder",
      "Recorded Fitness sessions",
    ],
    // group_personal_accidental_rider: [
    //   "Sum Insured",
    //   "Accidental Death",
    //   "Permanent Total Disability (Upto 100% SI Paid on PTD)",
    // ],
    // accident_dealth: ["15L (Primary Member Only)"],
    platform_benefits: [
      "Upto 50% off on diagnostic test & packages (20,000 diagnostics test up 50% discount)",
      "Upto 20% off on prescribed medicines",
    ],
    planCode: "wellnesselite",
  },
  // {
  //   id: 6,
  //   name: "Wellness Elite Plus",
  //   price: "₹6999",
  //   coverage: "Family - 2 Adults + 2 Children",
  //   benefits: [
  //     "12 Teleconsultation - General Physician(Instant)",
  //     "12 Teleconsultation - Ayurveda",
  //     "12 Teleconsultation - Homeopathy",
  //     "6 Teleconsultation - Choose from 18 Specialist",
  //     "4 Teleconsultation - Emotional Wellness",
  //     "4 Teleconsultation -  Dietician",
  //     "8 Video Consultation - General Physician",
  //     "1 Annual Health Checkup(Basic) - At Doorstep sample collection",
  //     "6 Consultations on In-person General Physician Clinic or Hospital Consultation for My Choice Doctor",
  //     "2 Dental Checkup & Consultation",
  //     "2 Pet Health Video Consultation",
  //   ],
  //   eligibility: "Valid for individuals aged 18–65.",
  //   value_added_features: [
  //     "Risk Assessment",
  //     "Health Reminder",
  //     "Recorded Fitness sessions",
  //   ],
  //   // group_personal_accidental_rider: [
  //   //   "Sum Insured",
  //   //   "Accidental Death",
  //   //   "Permanent Total Disability (Upto 100% SI Paid on PTD)",
  //   // ],
  //   // accident_dealth: ["15L (Primary Member Only)"],
  //   platform_benefits: [
  //     "Upto 50% off on diagnostic test & packages (30,000 diagnostics test up 50% discount)",
  //     "Upto 20% off on prescribed medicines",
  //   ],
  //   planCode: "wellnesseliteplus",
  // },
  {
    id: 7,
    name: "Wellness Platinum",
    price: "₹9999",
    coverage: "Family - 2 Adults + 2 Children",
    benefits: [
      "Unlimited Teleconsultation - General Physician(Instant)",
      "Unlimited Teleconsultation - Ayurveda",
      "Unlimited Teleconsultation - Homeopathy",
      "Unlimited Teleconsultation - Choose from 18 Specialist",
      "4 Teleconsultation - Emotional Wellness",
      "4 Teleconsultation -  Dietician",
      "8 Video Consultation - General Physician",
      "2 Annual Health Checkup(Basic) - At Doorstep sample collection",
      "8 Consultations on In-person General Physician Clinic or Reimbursement upto ₹300 per Consultation for My Choice Doctor",
      "4 Dental Checkup & Consultation",
      "2 Pet Health Video Consultation",
    ],
    eligibility: "Valid for individuals aged upto 60 years",
    value_added_features: [
      "Risk Assessment",
      "Health Reminder",
      "Recorded Fitness sessions",
    ],
    platform_benefits: [
      "Upto 50% off on diagnostic test & packages (50,000 diagnostics test up 50% discount)",
      "Upto 20% off on prescribed medicines",
    ],
    planCode: "wellnessplatinum",
  },
  {
    id: 8,
    name: "Wellness GoldenCare",
    price: "₹9999",
    coverage: "Individual",
    benefits: [
      "Unlimited Teleconsultation - General Physician(Instant)",
      "Unlimited Teleconsultation - Ayurveda",
      "Unlimited Teleconsultation - Homeopathy",
      "Unlimited Teleconsultation - Choose from 18 Specialist",
      "8 Teleconsultation - Emotional Wellness",
      "8 Teleconsultation -  Dietician",
      "8 Video Consultation - General Physician",
      "2 Annual Health Checkup(Essential) - At Doorstep sample collection",
      "6 Consultations on In-person General Physician Clinic or Reimbursement upto ₹300 per Consultation for My Choice Doctor",
      "2 Dental Checkup & Consultation",
      // "2 Pet Health Video Consultation",
    ],
    eligibility: "Valid for individuals aged Above 60 years",
    value_added_features: [
      "Risk Assessment",
      "Health Reminder",
      "Recorded Fitness sessions",
    ],
    platform_benefits: [
      "Upto 50% off on diagnostic test & packages (50,000 diagnostics test up 50% discount)",
      "Upto 20% off on prescribed medicines",
    ],
    planCode: "wellnessgoldencare",
  },
];

const GAP = 16;
const TOTAL = PLANS_META.length;

// ─── Responsive card sizes based on viewport ─────────────────────────────────
// FIX: Previously CARD_W=320 and ACTIVE_W=340 were module-level constants,
// meaning on a 375px mobile screen a single card was already 340px — nearly
// full width — leaving no room for peeking adjacent cards or correct centering.
// Now we derive sizes from the live viewport width.
function getCardSizes(viewportW) {
  if (viewportW < 480) {
    // Mobile: active card fills ~85% of screen, inactive peek at ~60%
    const activeW = Math.min(Math.floor(viewportW * 0.82), 320);
    const cardW = Math.floor(activeW * 0.72);
    return { CARD_W: cardW, ACTIVE_W: activeW };
  }
  if (viewportW < 768) {
    return { CARD_W: 260, ACTIVE_W: 300 };
  }
  // Desktop
  return { CARD_W: 320, ACTIVE_W: 340 };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const CheckIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
    <circle cx="8" cy="8" r="8" fill={active ? "#123B7C" : "#5C82C4"} fillOpacity="0.13" />
    <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke={active ? "#123B7C" : "#5C82C4"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SectionLabel = ({ heading, sub }) => (
  <div className="mt-5 mb-2.5 pb-2 border-b border-gray-100">
    <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">{heading}</p>
    {sub && <p className="text-xs text-[#5C82C4] mt-0.5">{sub}</p>}
  </div>
);

const BADGE_COLORS = {
  "Most Popular": { bg: "#123B7C", text: "#fff" },
  "Premium":      { bg: "#0D2E63", text: "#fff" },
  "Family":       { bg: "#294E93", text: "#fff" },
  "Senior Care":  { bg: "#0F8A3D", text: "#fff" },
};

// ─── Plan Card (pure display, no carousel logic inside) ───────────────────────
// FIX: This previously read from an undefined `ALL_PLAN_DETAILS` map and from
// fields (`plan.key`, `plan.badge`, `plan.tagline`, `plan.highlights`,
// `plan.sections`, `plan.members`) that don't exist on PLANS_META, which broke
// rendering entirely. It now reads planCode/price/coverage/benefits/etc.
// directly off the PLANS_META entry, building the "highlights" strip and the
// "Full details" sections from the real fields.
const PlanCard = React.memo(({ plan, yearKey, isActive, onBuy }) => {
  const badgeStyle = BADGE_COLORS[plan.badge] || {};
  const highlights = plan.benefits.slice(0, 4);
  const validityLabel = yearKey === "2yr" ? "2 Years" : "1 Year";

  const sections = [
    { heading: "Benefits", items: plan.benefits },
    { heading: "Eligibility", items: plan.eligibility ? [plan.eligibility] : [] },
    { heading: "Value Added Features", items: plan.value_added_features },
    { heading: "Platform Benefits", items: plan.platform_benefits },
  ].filter((section) => section.items && section.items.length > 0);

  return (
    <div
      className="flex flex-col h-full rounded-3xl overflow-hidden bg-white"
      style={{
        border: isActive ? "2px solid rgba(18,59,124,0.35)" : "2px solid rgba(0,0,0,0.06)",
        boxShadow: isActive
          ? "0 24px 60px rgba(18,59,124,0.18), 0 4px 16px rgba(18,59,124,0.08)"
          : "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="px-6 pt-6 pb-5 flex-shrink-0"
        style={{
          background: isActive
            ? "linear-gradient(135deg, #DCE6F5 0%, #EEF3FB 100%)"
            : "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
        }}
      >
        {/* Badge row */}
        <div className="flex items-center justify-between mb-3 min-h-[24px]">
          {plan.badge ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
              {plan.badge}
            </span>
          ) : <span />}
          {isActive && (
            <motion.span
              layoutId="active-dot"
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#123B7C", boxShadow: "0 0 0 4px rgba(18,59,124,0.18)" }}
            />
          )}
        </div>

        {/* Name */}
        <h3 className={`font-bold leading-tight ${isActive ? "text-xl text-gray-900" : "text-base text-gray-700"}`}>
          {plan.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1 leading-snug">{plan.coverage}</p>

        {/* Price */}
        <div className="mt-4 flex items-end gap-1.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={plan.price}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`font-extrabold tracking-tight ${isActive ? "text-4xl text-gray-900" : "text-3xl text-gray-700"}`}
            >
              {plan.price}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm text-gray-400 mb-1">+ GST</span>
        </div>

        {/* Validity chip */}
        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full" style={{ background: isActive ? "rgba(18,59,124,0.08)" : "rgba(0,0,0,0.04)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke={isActive ? "#123B7C" : "#9ca3af"} strokeWidth="1.2" />
            <path d="M6 3.5v3l1.5 1.5" stroke={isActive ? "#123B7C" : "#9ca3af"} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className={`text-xs font-semibold ${isActive ? "text-[#123B7C]" : "text-gray-400"}`}>
            Valid for {validityLabel}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onBuy(plan.planCode, plan.members ?? 0); }}
          disabled={!isActive}
          className="mt-4 w-full rounded-2xl py-3 text-sm font-semibold text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          style={{
            background: isActive
              ? "linear-gradient(135deg, #294E93 0%, #123B7C 100%)"
              : "linear-gradient(135deg, #5C82C4 0%, #0D2E63 100%)",
            boxShadow: isActive ? "0 4px 16px rgba(18,59,124,0.35)" : "0 2px 8px rgba(92,130,196,0.25)",
          }}
        >
          Buy Plan
        </button>
      </div>

      {/* ── Highlights strip ── */}
      <div className="px-5 py-4 flex-shrink-0" style={{ background: isActive ? "#EEF3FB" : "#f9fafb", borderTop: "1px solid", borderColor: isActive ? "rgba(18,59,124,0.1)" : "rgba(0,0,0,0.05)" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: isActive ? "#294E93" : "#9ca3af" }}>
          What's included
        </p>
        <ul className="space-y-1.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
              <CheckIcon active={isActive} />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Full details ── */}
      <div className="px-5 py-4 flex-1 overflow-y-auto" style={{ maxHeight: 420 }}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Full Plan Details</p>
        {sections.map((section, si) => (
          <div key={si}>
            {section.heading && <SectionLabel heading={section.heading} sub={section.headingSub} />}
            <ul className="space-y-2.5 mb-1">
              {section.items.map((item, ii) => {
                if (typeof item === "string") {
                  return (
                    <li key={ii} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                      <CheckIcon active={isActive} />
                      <span>{item}</span>
                    </li>
                  );
                }
                return (
                  <li key={ii} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                    <CheckIcon active={isActive} />
                    <span>
                      {item.text}&nbsp;
                      <Tooltip content={item.tooltip} position="top">
                        <span className="border-b border-dashed border-gray-400 cursor-pointer">{item.label}</span>
                      </Tooltip>
                      {item.suffix && <><br /><span className="text-xs text-gray-400">{item.suffix}</span></>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});
PlanCard.displayName = "PlanCard";

// ─── Dot Indicator ───────────────────────────────────────────────────────────
const DotIndicator = ({ count, active, onChange }) => (
  <div className="flex items-center gap-2 justify-center mt-6">
    {Array.from({ length: count }).map((_, i) => (
      <button key={i} onClick={() => onChange(i)} aria-label={`Go to plan ${i + 1}`} className="focus:outline-none p-1">
        <motion.div
          animate={{ width: i === active ? 28 : 8, backgroundColor: i === active ? "#123B7C" : "#D1D5DB" }}
          transition={{ duration: 0.25 }}
          style={{ height: 8, borderRadius: 4 }}
        />
      </button>
    ))}
  </div>
);

// ─── Carousel offset calculator ───────────────────────────────────────────────
// FIX: Now receives CARD_W and ACTIVE_W as arguments instead of using stale constants.
function calcOffset(index, viewportW, CARD_W, ACTIVE_W) {
  const leftEdge = index * (CARD_W + GAP);
  const center = leftEdge + ACTIVE_W / 2;
  return viewportW / 2 - center;
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const PlanPage = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [planCode, setPlanCode] = useState("");
  const [tenantId] = useState("T6993001XT7");
  const [isRider] = useState(false);
  const [showMember] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [showRC] = useState(false);

  const yearKey = "1yr";

  const [activeIndex, setActiveIndex] = useState(3);
  const [viewportW, setViewportW] = useState(0);

  // FIX: Derive card sizes from live viewport width on every render
  const { CARD_W, ACTIVE_W } = getCardSizes(viewportW);

  const trackX = useMotionValue(0);
  const viewportRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartTrackX = useRef(0);
  const isDragging = useRef(false);

  // Measure viewport
  useLayoutEffect(() => {
    const measure = () => {
      if (viewportRef.current) setViewportW(viewportRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  // Snap to active index whenever activeIndex or viewportW changes
  // FIX: Pass CARD_W and ACTIVE_W so calcOffset uses the correct responsive values
  useEffect(() => {
    if (!viewportW) return;
    const target = calcOffset(activeIndex, viewportW, CARD_W, ACTIVE_W);
    animate(trackX, target, { type: "spring", stiffness: 380, damping: 36, mass: 0.8 });
  }, [activeIndex, viewportW, CARD_W, ACTIVE_W]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx));
    setActiveIndex(clamped);
  }, []);

  const openBuy = (code, members = 0) => {
    setPlanCode(code);
    setMemberCount(members);
    setOpenPopup(true);
  };

  // Total track width (all cards, each treated as CARD_W except active which is ACTIVE_W — but for drag bounds we use a simpler calc)
  const trackW = TOTAL * CARD_W + (TOTAL - 1) * GAP + (ACTIVE_W - CARD_W); // extra for active card
  const minX = viewportW / 2 - trackW + CARD_W / 2;
  const maxX = viewportW / 2 - ACTIVE_W / 2;

  const onDragStart = (e) => {
    if (e.target.closest("button")) { isDragging.current = false; return; }
    isDragging.current = true;
    dragStartX.current = e.clientX ?? 0;
    dragStartTrackX.current = trackX.get();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onDragMove = (e) => {
    if (!isDragging.current) return;
    if (e.buttons === 0 && e.type === "pointermove") return;
    const currX = e.clientX ?? 0;
    const delta = currX - dragStartX.current;
    trackX.set(Math.max(minX, Math.min(maxX, dragStartTrackX.current + delta)));
  };

  const onDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const currX = e.clientX ?? dragStartX.current;
    const delta = currX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    } else {
      animate(trackX, calcOffset(activeIndex, viewportW, CARD_W, ACTIVE_W), { type: "spring", stiffness: 380, damping: 36 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16 lg:py-24 xl:py-44 max-md:pt-[110px]">
        <div className="px-2 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mx-auto max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-5" style={{ borderColor: "rgba(18,59,124,0.25)", background: "#EEF3FB" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "#123B7C" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#123B7C" }} />
              </span>
              <span className="text-sm font-medium" style={{ color: "#123B7C" }}>Simple Pricing</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Pick Your Perfect<br className="sm:hidden" /> Health Plan
            </h2>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
              Choose a plan that fits your lifestyle, with the flexibility to upgrade anytime and access healthcare support from day one.
            </p>
          </div>

          {/* ── Plan name tabs (quick jump) ── */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-6 px-4">
            {PLANS_META.map((plan, i) => (
              <button
                key={plan.planCode}
                onClick={() => goTo(i)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all focus:outline-none"
                style={{
                  background: i === activeIndex ? "#123B7C" : "rgba(18,59,124,0.07)",
                  color: i === activeIndex ? "#fff" : "#6b7280",
                  boxShadow: i === activeIndex ? "0 2px 10px rgba(18,59,124,0.28)" : "none",
                }}
              >
                {plan.name.replace("Saayaa ", "")}
              </button>
            ))}
          </div>

          {/* ── Carousel ── */}
          <div className="relative">
            {/* Left arrow */}
            <motion.button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:opacity-25 disabled:pointer-events-none"
              style={{ boxShadow: "0 4px 20px rgba(18,59,124,0.18)", border: "1.5px solid rgba(18,59,124,0.15)" }}
              aria-label="Previous plan"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 14l-5-5 5-5" stroke="#123B7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            {/* Right arrow */}
            <motion.button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === TOTAL - 1}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:opacity-25 disabled:pointer-events-none"
              style={{ boxShadow: "0 4px 20px rgba(18,59,124,0.18)", border: "1.5px solid rgba(18,59,124,0.15)" }}
              aria-label="Next plan"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="#123B7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            {/* Viewport: clips the track */}
            <div
              ref={viewportRef}
              className="overflow-hidden w-full"
              style={{ cursor: "grab", userSelect: "none",touchAction: "pan-y" }}
              // onPointerDown={onDragStart}
              // onPointerMove={onDragMove}
              // onPointerUp={onDragEnd}
              // onPointerCancel={onDragEnd}
              // onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; dragStartTrackX.current = trackX.get();}}
              // onTouchMove={(e) => { const d = e.touches[0].clientX - dragStartX.current; trackX.set(Math.max(minX, Math.min(maxX, dragStartTrackX.current + d)));}}
              // onTouchEnd={(e) => {const d = e.changedTouches[0].clientX - dragStartX.current;if (Math.abs(d) > 40) goTo(activeIndex + (d < 0 ? 1 : -1));
              //   else animate(trackX, calcOffset(activeIndex, viewportW, CARD_W, ACTIVE_W), { type: "spring", stiffness: 380, damping: 36 });}}
            >
              {/* Track */}
              <motion.div
                style={{ x: trackX, display: "flex", alignItems: "flex-start", gap: GAP, paddingBottom: 24, paddingTop: 8 }}
              >
                {PLANS_META.map((plan, i) => {
                  const isActive = i === activeIndex;
                  const distance = Math.abs(i - activeIndex);
                  const scale = isActive ? 1 : Math.max(0.88, 1 - distance * 0.06);
                  const opacity = isActive ? 1 : Math.max(0.5, 1 - distance * 0.22);

                  return (
                    <motion.div
                      key={plan.planCode}
                      animate={{ scale, opacity, width: isActive ? ACTIVE_W : CARD_W }}
                      transition={{ type: "spring", stiffness: 340, damping: 32 }}
                      style={{ flexShrink: 0, originY: 0 }}
                      onClick={() => !isActive && goTo(i)}
                    >
                      <PlanCard
                        plan={plan}
                        yearKey={yearKey}
                        isActive={isActive}
                        onBuy={openBuy}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* ── Dot nav ── */}
          <DotIndicator count={TOTAL} active={activeIndex} onChange={goTo} />

          {/* ── Counter ── */}
          <p className="text-center text-xs text-gray-400 mt-2">
            {activeIndex + 1} of {TOTAL} plans &nbsp;·&nbsp;
            <span className="md:hidden">Swipe to explore</span>
            <span className="hidden md:inline">Use arrows or click a plan to navigate</span>
          </p>
        </div>
      </section>

      <BuyPlan
        planCode={planCode}
        tenantId={tenantId}
        showPopUp={openPopup}
        setShowPopUp={setOpenPopup}
        isRider={isRider}
        showMember={showMember}
        memberCount={memberCount}
        showRC={showRC}
      />
    </div>
  );
};

export default PlanPage;