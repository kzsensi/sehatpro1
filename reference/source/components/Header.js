import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobilePoliciesOpen, setIsMobilePoliciesOpen] = useState(false);

  const policiesRef = useRef(null);
  const loginRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    setIsPoliciesOpen(false);
    setIsLoginOpen(false);
    setIsMobilePoliciesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (policiesRef.current && !policiesRef.current.contains(e.target))
        setIsPoliciesOpen(false);
      if (loginRef.current && !loginRef.current.contains(e.target))
        setIsLoginOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const policies = [
    { label: "Terms & Conditions",   to: "/term-of-use" },
    { label: "Shipping & Delivery",  to: "/shipping-delivery-policy" },
    { label: "Privacy Policy",       to: "/privacy-policy" },
    { label: "Cancellation Policy",  to: "/cancellation-policy" },
  ];

  const logins = [
    { label: "Customer Login",       href: "login.html" },
    { label: "Leader/Agent Login",   href: "https://portal.sehatfirstpro.com/" },
  ];

  // helper for active nav link styling
  const navLink = (path) =>
    `font-semibold transition-colors duration-200 ${
      location.pathname === path
        ? "text-brand-600"
        : "text-brand-800 hover:text-brand-600"
    }`;

  // true if current page is any policy page
  const isPolicyActive = policies.some((p) => p.to === location.pathname);

  return (
    <>
      <header className="fixed top-4 left-0 w-full z-50 px-3 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-full shadow-[0_8px_30px_rgba(18,59,124,0.10)] border border-gray-100 px-4 lg:px-8 py-2.5">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 shrink-0">
                <img
                  src="/assets/images/sehatlogo.png"
                  alt="SehatFirstPro"
                  className="h-11 lg:h-12 w-auto object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-9 text-[16px]">
                <Link to="/" className={navLink("/")}>Home</Link>
                <Link to="/plans" className={navLink("/plans")}>Plans</Link>

                {/* Policies Dropdown */}
                <div className="relative" ref={policiesRef}>
                  <button
                    onClick={() => {
                      setIsPoliciesOpen(!isPoliciesOpen);
                      setIsLoginOpen(false);
                    }}
                    className={`flex items-center gap-1.5 font-semibold transition-colors duration-200 ${
                      isPolicyActive
                        ? "text-brand-600"
                        : "text-brand-800 hover:text-brand-600"
                    }`}
                  >
                    Policies
                    <i
                      className={`bi bi-chevron-down text-xs transition-transform duration-200 ${
                        isPoliciesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isPoliciesOpen && (
                    <ul className="absolute top-10 left-0 bg-white rounded-2xl shadow-xl p-2 min-w-[240px] z-50 border border-gray-100">
                      {policies.map((p) => (
                        <li key={p.to}>
                          <Link
                            to={p.to}
                            className={`block px-4 py-2.5 rounded-xl text-[15px] font-semibold transition-colors duration-200 ${
                              location.pathname === p.to
                                ? "bg-brand-50 text-brand-600"
                                : "text-brand-800 hover:bg-brand-50 hover:text-brand-600"
                            }`}
                            onClick={() => setIsPoliciesOpen(false)}
                          >
                            {p.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link to="/contact" className={navLink("/contact")}>Contact</Link>
              </nav>

              {/* Desktop Login Dropdown */}
              <div className="hidden lg:block relative" ref={loginRef}>
                <button
                  onClick={() => {
                    setIsLoginOpen(!isLoginOpen);
                    setIsPoliciesOpen(false);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-semibold bg-brand-600 shadow-brand hover:bg-brand-700 hover:-translate-y-0.5 transition-all duration-200 text-[15px]"
                >
                  Login
                  <i
                    className={`bi bi-chevron-down text-xs transition-transform duration-200 ${
                      isLoginOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLoginOpen && (
                  <ul className="absolute top-14 right-0 bg-white rounded-2xl shadow-xl p-2 min-w-[250px] z-50 border border-gray-100">
                    {logins.map((l) => (
                      <li key={l.label}>
                        {/* Login links go to external/non-SPA URLs so <a> is correct here */}
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-[15px] rounded-xl text-brand-800 hover:bg-brand-50 hover:text-brand-600 transition-colors duration-200 font-semibold"
                          onClick={() => setIsLoginOpen(false)}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden w-11 h-11 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-brand"
              >
                <i className="bi bi-list text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[70] lg:hidden shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <img
            src="/assets/images/sehatlogo.png"
            alt="SehatFirstPro"
            className="h-9 w-auto object-contain"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            <i className="bi bi-x-lg text-lg" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors duration-200 ${
              location.pathname === "/"
                ? "bg-brand-50 text-brand-600"
                : "text-brand-800 hover:bg-brand-50 hover:text-brand-600"
            }`}
          >
            <i className="bi bi-house text-lg" />
            Home
          </Link>

          <Link
            to="/plans"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors duration-200 ${
              location.pathname === "/plans"
                ? "bg-brand-50 text-brand-600"
                : "text-brand-800 hover:bg-brand-50 hover:text-brand-600"
            }`}
          >
            <i className="bi bi-grid text-lg" />
            Plans
          </Link>

          {/* Mobile Policies Accordion */}
          <div>
            <button
              onClick={() => setIsMobilePoliciesOpen(!isMobilePoliciesOpen)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl font-medium transition-colors duration-200 ${
                isPolicyActive
                  ? "bg-brand-50 text-brand-600"
                  : "text-brand-800 hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              <span className="flex items-center gap-3">
                <i className="bi bi-shield-check text-lg" />
                Policies
              </span>
              <i
                className={`bi bi-chevron-down text-sm transition-transform duration-200 ${
                  isMobilePoliciesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isMobilePoliciesOpen ? "max-h-60" : "max-h-0"
              }`}
            >
              <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-brand-200 pl-3">
                {policies.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className={`px-3 py-2 rounded-xl text-sm transition-colors duration-200 ${
                      location.pathname === p.to
                        ? "bg-brand-50 text-brand-600 font-medium"
                        : "text-brand-800 hover:bg-brand-50 hover:text-brand-600"
                    }`}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors duration-200 ${
              location.pathname === "/contact"
                ? "bg-brand-50 text-brand-600"
                : "text-brand-800 hover:bg-brand-50 hover:text-brand-600"
            }`}
          >
            <i className="bi bi-telephone text-lg" />
            Contact
          </Link>
        </nav>

        {/* Mobile Login at Bottom */}
        <div className="px-4 pb-8 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 px-2">
            Login As
          </p>
          <div className="flex flex-col gap-2">
            {logins.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-50 text-brand-700 font-medium hover:bg-brand-600 hover:text-white transition-colors duration-200"
              >
                <i className="bi bi-person text-lg" />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
