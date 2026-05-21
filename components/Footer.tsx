"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FiChevronRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Image from "next/image";

import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
  contactPhoneHref,
} from "@/lib/contact";
import { brand } from "@/lib/brand";
import MailtoLink from "@/components/MailtoLink";

const GOLD = brand.goldFooterBar;

const footerSans =
  "font-[family-name:var(--font-montserrat),ui-sans-serif,system-ui,sans-serif] not-italic";

const servicesLinks = [
  { label: "Physiotherapy", href: "/physiotherapy" },
  { label: "Pilates", href: "/pilates" },
  { label: "Yoga", href: "/yoga" },
  { label: "Therapy", href: "/therapy" },
  { label: "Courses", href: "/courses" },
] as const;
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blogs" },
] as const;

type SocialItem = {
  Icon: IconType;
  href: string;
  label: string;
};

const socialLinks: SocialItem[] = [
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { Icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer id="contact" className={`relative ${footerSans}`}>
      <div className="h-1 w-full bg-[#f0ebe3]" aria-hidden />

      <div className="bg-white px-5 py-14 sm:px-6 md:py-16" style={{ backgroundColor: brand.cream }}>
        <div className="mx-auto grid min-w-0 max-w-6xl gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)_minmax(0,0.92fr)_minmax(0,1.28fr)] lg:gap-x-8 xl:gap-x-11">
          <div className="flex min-w-0 flex-col items-start gap-3">
            <Image src="/logo.png" alt="Logo" width={140} height={140} className="h-auto w-[120px] sm:w-[132px]" />
            <p className="mt-4 max-w-md text-[15px] font-medium leading-relaxed text-neutral-700 sm:text-[16px]">
              Transform your life through mindful movement, expert care & holistic healing.
            </p>
          </div>

          <div id="services" className="min-w-0">
            <h3 className={`${footerSans} text-base font-semibold leading-snug text-neutral-900 sm:text-[17px]`}>
              Services
            </h3>
            <ul className="mt-5 space-y-3.5">
              {servicesLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`${footerSans} group flex items-center gap-2 text-[15px] font-semibold leading-relaxed text-neutral-700 no-underline transition-colors hover:text-neutral-950 sm:text-base`}
                  >
                    <FiChevronRight className="text-base shrink-0" style={{ color: GOLD }} aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="company" className="min-w-0">
            <h3 className={`${footerSans} text-base font-semibold leading-snug text-neutral-900 sm:text-[17px]`}>
              Company
            </h3>
            <ul className="mt-5 space-y-3.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`${footerSans} group flex items-center gap-2 text-[15px] font-semibold leading-relaxed text-neutral-700 no-underline transition-colors hover:text-neutral-950 sm:text-base`}
                  >
                    <FiChevronRight className="text-base shrink-0" style={{ color: GOLD }} aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className={`${footerSans} text-base font-semibold leading-snug text-neutral-900 sm:text-[17px]`}>
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4 text-[15px] leading-relaxed sm:text-base">
              <li className="flex gap-3 sm:gap-4">
                <FiMapPin className="mt-0.5 shrink-0 text-lg" style={{ color: GOLD }} aria-hidden />
                <address className="min-w-0 flex-1 not-italic leading-relaxed [overflow-wrap:anywhere]">
                  <span className="font-normal tracking-[0.01em] text-[14px] text-neutral-600 sm:text-[15px]">
                    {contactAddressPlain}
                  </span>
                </address>
              </li>
              <li className="flex min-w-0 items-center gap-3 sm:gap-4">
                <FiPhone className="shrink-0 text-lg" style={{ color: GOLD }} aria-hidden />
                <a
                  href={`tel:${contactPhoneHref}`}
                  className="min-w-0 font-semibold text-neutral-900 no-underline transition-colors hover:text-neutral-950 hover:underline"
                >
                  {contactPhoneDisplay}
                </a>
              </li>
              <li className="flex min-w-0 items-start gap-3 sm:gap-4">
                <FiMail className="mt-0.5 shrink-0 text-lg" style={{ color: GOLD }} aria-hidden />
                <MailtoLink
                  email={contactEmailDisplay}
                  className="min-w-0 flex-1 text-[14px] font-semibold leading-snug text-neutral-900 underline underline-offset-4 decoration-neutral-400/80 transition-colors hover:text-neutral-950 hover:decoration-neutral-500 sm:text-[15px]"
                />
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:bg-neutral-100 active:scale-[0.98] sm:size-10 sm:min-h-10 sm:min-w-10"
                  style={{ color: GOLD }}
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${footerSans} px-5 py-4 text-center text-[13px] font-medium leading-snug text-white sm:py-[1.125rem] sm:text-sm`}
        style={{ backgroundColor: GOLD }}
      >
        <p className="max-w-4xl mx-auto">
          © {new Date().getFullYear()} Physio Pilates. All rights reserved. | Powered by{" "}
          <a href="https://rankmantra.com" className="underline underline-offset-2 transition-opacity hover:opacity-95">
            Rankmantra
          </a>
        </p>
      </div>
    </footer>
  );
}
