import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  ShieldCheck,
  HeartPulse,
  Smile,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const features2 = [
    {
      title: "Simple Plans, No Confusion",
      description:
        "No complicated terms or hidden clauses. Our membership plans clearly explain what's covered, so you always know exactly what benefits you receive.",
      icon: Clock3,
      bg: "from-blue-100 to-cyan-100",
      iconColor: "text-[#123B7C]",
    },
    {
      title: "Affordable for Every Family",
      description:
        "Starting at just ₹99, enjoy quality healthcare benefits without financial stress. Visit doctors with confidence while keeping your healthcare expenses under control.",
      icon: ShieldCheck,
      bg: "from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
    },
    {
      title: "OPD & Wellness Combined",
      description:
        "Get doctor consultations, annual health checkups, and preventive care in one comprehensive plan. Because good health is about prevention as much as treatment.",
      icon: HeartPulse,
      bg: "from-red-100 to-orange-100",
      iconColor: "text-red-500",
    },
    {
      title: "Trusted Doctors & Clinics",
      description:
        "Our network includes carefully verified doctors, clinics, and diagnostic centers, ensuring reliable and quality healthcare services whenever you need them.",
      icon: Smile,
      bg: "from-green-100 to-emerald-100",
      iconColor: "text-green-500",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ram Yadav",
      review:
        "Health plans mujhe pehle complicated lagte the, lekin Sehatfirstpro simple aur clear hai. Family ke liye kaafi useful laga.",
      image: "/assets/images/testimonial1.jpg",
    },
    {
      id: 2,
      name: "Akshay Sinha",
      review:
        "Busy lifestyles can make it difficult to prioritize health. These plan helps me stay on top of my well-being",
      image: "/assets/images/male.png",
    },
    {
      id: 3,
      name: "Ajay Pal",
      review:
        "Choti health problems ke liye bade bills ka tension tha.Sehatfirstpro ne healthcare ko affordable bana diya.",
      image: "/assets/images/testimonial3.jpg",
    },
    {
      id: 4,
      name: "Sunidhi Shah",
      review:
        "Small health concerns often came with the worry of large medical bills. Sehatfirstpro has made healthcare more affordable and accessible",
      image: "/assets/images/testimonial2.jpg",
    },
  ];

  const services = [
    {
      title: "Tele Consultation",
      description: "Connect with doctors anytime, anywhere.",
      image: "/assets/images/tele-consultation.png",
      size: "large",
    },
    {
      title: "Diagnostics",
      description: "Health checkups and lab tests.",
      image: "/assets/images/diagnostic.png",
    },
    {
      title: "Consultation",
      description: "Meet specialists for expert care.",
      image: "/assets/images/inclinic-consultation.png",
    },
    {
      title: "Mental Wellness",
      description: "Professional support for mental health.",
      image: "/assets/images/mental-well-ness.jpg",
    },
    {
      title: "Vitals via Face Scan",
      description: "AI-powered instant vital tracking.",
      image: "/assets/images/face-scan.png",
    },
    {
      title: "Video Consultation",
      description: "Consult doctors through secure video calls.",
      image: "/assets/images/video-con.jpg",
      size: "wide",
    },
    {
      title: "Chat With Experts",
      description: "Instant guidance from professionals.",
      image: "/assets/images/chat.png",
    },
    {
      title: "Naturopathy",
      description: "Natural healing and wellness solutions.",
      image: "/assets/images/Naturopathy.jpg",
    },
  ];

  function Card({ title, image }) {
    return (
      <div className="group relative h-[250px] overflow-hidden rounded-[32px] bg-white shadow-sm hover:shadow-2xl transition-all duration-500">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
      </div>
    );
  }

  const slides = [
    {
      id: "01",
      tag: "Our Mission",
      title: "Health & Well-Being",
      desc: "Prioritizing patient needs at the core of our mission, ensuring affordable and accessible healthcare for every family.",
    },
    {
      id: "02",
      tag: "Our Services",
      title: "OPD & Wellness Care",
      desc: "From tele-consultation to diagnostics, we cover 50+ healthcare services — all under one simple, budget-friendly plan.",
    },
    {
      id: "03",
      tag: "Our Network",
      title: "100+ Trusted Providers",
      desc: "Access verified doctors, specialist clinics, and certified labs near you — quality care without compromise.",
    },
  ];
  return (
    <main>
      <div className="overflow-x-hidden bg-white">
        <section className=" relative flex flex-col gap-10 sm:gap-16 lg:gap-10 py-12 lg:py-16 sm:pt-[150px] lg:pt-[170px] xl:pb-0 max-md:py-[150px]">
          <div className="w-full sm:max-w-[80%] mx-auto px-6 sm:px-8 lg:px-12 pb-10 lg:pb-24">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Content Section */}
              <div className="flex-1 justify-center lg:justify-start">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[54px] font-bold leading-tight tracking-tight text-[#0A2350]">
                  ADVANCING HEALTHCARE
                  <br />
                  FOR A
                  <br />
                  BETTER TOMORROW
                </h1>

                <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-[#123B7C] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Empowering healthier lives through smart healthcare solutions,
                  trusted professionals, and personalized support.
                </p>

                <div className="mt-8 flex ">
                  <Link to="/plans">
                    <button className="bg-[#123B7C] hover:bg-[#0D2E63] text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full text-base sm:text-lg font-medium shadow-brand hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                      Start Your Journey
                    </button>
                  </Link>
                </div>
              </div>

              {/* Image Section */}
              <div className="flex-1 w-full">
                {/* overflow-hidden rounded-3xl shadow-2xl */}
                <div className="relative ">
                  <img
                    src="assets/images/hero-section.png"
                    alt="Healthcare"
                    className="w-full h-[280px] sm:h-[400px] lg:h-[520px] xl:h-[490px] object-cover"
                  />                 
                </div>
              </div>
            </div>
          </div>
           <div className="absolute inset-0 bg-gradient-to-r from-[#123B7C]/10 to-transparent pointer-events-none" />

          {/* <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-10 pb-10 lg:pb-20 border">
            <div className="w-[520px] xl:w-[470px] 2xl:w-[450px] bg-[#0F3F93] text-white rounded-[40px] p-8 lg:p-6 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold uppercase  bg-white/20 px-3 py-1.5 rounded-full text-white">
                  {slides[current].tag}
                </span>
                <span className="text-sm text-gray-300">
                  {slides[current].id}/{String(slides.length).padStart(2, "0")}
                </span>
              </div>

              <p className="text-sm text-gray-300 max-w-[320px] leading-relaxed mt-3 lg:mt-2 min-h-[42px] transition-all duration-300">
                {slides[current].desc}
              </p>

              <div className="mt-6 lg:mt-4 flex items-center justify-between">
                <h3 className="uppercase text-lg tracking-wide font-semibold text-white">
                  {slides[current].title}
                </h3>

                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-white text-[#146DA7] flex items-center justify-center hover:scale-105 transition"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-white text-[#146DA7] flex items-center justify-center hover:scale-105 transition"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-10 lg:mt-20 xl:mt-10 w-full">
              <div className=" px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#1E73E8] to-[#146DA7] shadow-lg  text-white text-base sm:text-lg">
                Patient-Focused
              </div>

              <div className=" px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#1E73E8] to-[#146DA7] shadow-lg  text-white text-base sm:text-lg">
                Trusted Care
              </div>

              <div className=" px-6 sm:px-8 py-2 sm:py-3  rounded-full bg-gradient-to-r from-[#1E73E8] to-[#146DA7] shadow-lg  text-white text-base sm:text-lg">
                Medical Excellence
              </div>
            </div>
          </div> */}
        </section>
      </div>

      {/* New Hero End */}
      <section className="bg-[#EEF3FB] pt-20 pb-32 -mt-20 sm:mt-0">
        <div className="w-full xl:w-[80%] mx-auto px-6">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 border bg-[#123B7C] text-white rounded-full px-4 py-2 text-sm mb-6">
                About Our Sehatfirstpro
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-2xl">
                Better Healthcare Access
                <br />
                For Everyday Life
              </h2>
            </div>

            <p className="text-gray-700 text-xl max-w-2xl leading-relaxed">
              At Sehatfirstpro, we believe that good healthcare should be easy to
              access, affordable, and available whenever you need it. Our
              mission is to support individuals and families with reliable
              healthcare services, helping them stay healthy, manage medical
              expenses, and enjoy greater peace of mind. We are dedicated to
              making everyday healthcare simpler, more convenient, and more
              accessible for everyone.
            </p>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Image Card */}
            <div className="relative overflow-hidden rounded-[36px] min-h-[320px]">
              <img
                src="/assets/images/aboutt.png"
                alt="Caregiver"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2350]/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold leading-tight text-white">
                  Trusted Healthcare Services
                </h3>
              </div>
            </div>

            {/* Blue Card */}
            <div className="bg-gradient-to-r from-[#123B7C] to-[#0A2350] rounded-[36px] p-6 sm:p-8 text-white flex flex-col justify-between min-h-[320px]">
              <div>
                <div className="text-5xl mb-6">🤝</div>
                <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-snug text-white">
                  Healthcare Consultations
                </h3>
                <p className="mt-4 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-white/95">
                  Connect with qualified healthcare professionals for expert
                  medical advice, diagnosis, and treatment guidance anytime.
                </p>
              </div>
              <div className="flex items-center gap-3 text-lg mt-6">
                <span>Tele / In-Clinic Visits</span>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#071A3D] rounded-[36px] p-8 text-white min-h-[320px]">
              <div className="text-5xl mb-4 sm:mb-6">🌎</div>
              <p className="text-[clamp(1.25rem,2.5vw,1.75rem)]">
                Pan-India Network of Specialists
              </p>
              <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed mt-3 sm:mt-4">
                You aren't restricted to one clinic. We have partnered with an
                extensive network of verified General Practitioners and
                Specialists (Cardiologists, Pediatricians, Gynecologists, etc.),
                ensuring that quality healthcare is always just a few minutes
                away from your home.
              </p>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-24">
            {/* Section Label */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 mb-14">
              <div className="flex items-center justify-center gap-2">
                <img
                  src="/assets/images/fact.svg"
                  alt=""
                  className="w-10 h-10"
                />
                <p className="text-[#123B7C] text-[18px] font-semibold uppercase tracking-widest">
                  Our Trusted Partners
                </p>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              slidesPerView={2}
              spaceBetween={30}
              loop={true}
              speed={3000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
              className="mt-11"
            >
              {[
                "/assets/images/partner_logo/1.svg",
                "/assets/images/partner_logo/2.svg",
                "/assets/images/partner_logo/4.svg",
                "/assets/images/partner_logo/5.svg",
                "/assets/images/partner_logo/6.svg",
                "/assets/images/partner_logo/7.svg",
                "/assets/images/partner_logo/8.svg",
                "/assets/images/partner_logo/9.png",
                "/assets/images/partner_logo/10.png",
                "/assets/images/partner_logo/11.png",
                "/assets/images/partner_logo/12.png",
                "/assets/images/partner_logo/13.svg",
                "/assets/images/partner_logo/14.png",
              ].map((logo, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center h-[100px]">
                    <img
                      src={logo}
                      alt={`Partner ${index + 1}`}
                      className="max-h-[60px] w-auto object-contain hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#EEF3FB] to-white pointer-events-none" />

        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#294E93]/10 blur-[120px] pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#123B7C]/10 blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Heading */}
          <div className="text-left mb-16">
            <div className="relative inline-block">
              {/* <img
                src="/assets/images/ecipsebg.svg"
                alt=""
                className="absolute -left-12 -top-10 w-32 md:w-48 z-0"
              /> */}
              <h2 className="relative z-10 text-4xl md:text-5xl font-bold">
                Why Choose Us?
              </h2>
              <p className="text-slate-900 mt-2 z-10 relative">
                Delivering accessible, affordable, and reliable healthcare
                experiences
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left Features */}
            <div className="space-y-6">
              {features2.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                    group
                    bg-white
                    border border-gray-100
                    rounded-3xl
                    p-6
                    shadow-[0_10px_40px_rgba(18,59,124,0.06)]
                    hover:-translate-y-1
                    hover:shadow-[0_20px_60px_rgba(18,59,124,0.10)]
                    hover:border-[#123B7C]/20
                    transition-all
                    duration-300
                  "
                  >
                    <div className="flex gap-5">
                      <div
                        className={`
                        w-16 h-16
                        rounded-2xl
                        bg-gradient-to-br ${item.bg}
                        flex items-center justify-center
                        shrink-0
                      `}
                      >
                        <Icon size={28} className={item.iconColor} />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#123B7C] mb-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className=" ">
                <img
                  src="/assets/images/why-choose.jpg"
                  alt="Healthcare Experience"
                  className="w-[80%] mx-auto sm:w-[50%] rounded-[32px] lg:w-[83%] xl:w-[87%]
                    h-[500px] sm:h-[500px] lg:h-[600px] xl:h-[700px]
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative text-left mb-16">
            <div className="relative inline-block">
              {/* <img
                src="/assets/images/ecipsebg.svg"
                alt=""
                className="absolute -left-12 -top-10 w-32 md:w-48 z-0"
              /> */}
              <h2 className="relative z-10 text-4xl md:text-5xl font-bold">
                Healthcare Services
              </h2>
              <p className="text-slate-900 mt-2 z-10 relative">
                Everything you need for better healthcare.
              </p>
            </div>
          </div>

          <div className="grid auto-rows-[250px] gap-6 md:grid-cols-4">
            {services.map((service, index) => {
              if (service.size === "large") {
                return (
                  <div
                    key={index}
                    className="group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[32px]"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <span className="px-4 py-2 rounded-full bg-white/25 text-sm font-medium">
                        Featured
                      </span>
                      <h3 className="text-4xl font-bold mt-4 text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-white/80 max-w-md">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              }

              if (service.size === "wide") {
                return (
                  <div
                    key={index}
                    className="group md:col-span-2 relative overflow-hidden rounded-[32px]"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
                      <h3 className="text-3xl font-bold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-white/80 max-w-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <Card key={index} title={service.title} image={service.image} />
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden w-[90%] max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[#0C7233] via-[#16A34A] to-[#2FBE5C] p-8 md:p-12 shadow-[0_20px_60px_rgba(12,114,51,0.25)] my-20">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 left-1/3 w-40 h-40 bg-white/10 rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-5">
              ✨ Trusted Healthcare Partner
            </span>

            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              Your Health Deserves
              <br />
              Exceptional Care
            </h2>

            <p className="mt-5 text-lg text-white/90 max-w-xl">
              Experience comprehensive healthcare solutions, cashless
              hospitalization benefits, and dedicated support designed for you
              and your family.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-2">
            <Link to="/plans">
              <button className="group bg-white text-[#123B7C] hover:bg-[#EEF3FB] hover:-translate-y-0.5 transition-all duration-300 px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
                Get Started Today
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </Link>
            <p className="text-sm text-white/80">
              Join thousands of satisfied members
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f8f8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}

          <div className="text-center mb-20">
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl uppercase inline-block">
              Our happy <p className="text-[#123B7C] inline-block">clients </p>{" "}
              say about us
            </h2>

            <div className="w-80 h-[3px] bg-[#123B7C] mx-auto mt-5" />
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            speed={700}
            autoplay={{
              delay: 3000,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonial-card border">
                  {/* Avatar */}

                  <div className="absolute z-10 -top-14 left-1/2 -translate-x-1/2">
                    <div className="w-28 h-28 rounded-full border-2 border-[#B4C9E9] p-1 bg-[#123B7C]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Stars */}

                  <div className="testimonial-stars mt-10 flex justify-center gap-1 text-2xl">
                    ★★★★★
                  </div>

                  <h3 className="text-4xl font-semibold mt-2">{item.name}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {item.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
