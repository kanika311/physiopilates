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
import { brand } from "@/lib/brand";
import Image from "next/image";

const GOLD = brand.goldFooterBar;

const servicesLinks = [
  { label: "Physiotherapy", href: "/physiotherapy" },
  { label: "Pilates", href: "/pilates" },
  { label: "Yoga", href: "/yoga" },
  { label: "Therapy", href: "/therapy" },
  { label: "Courses", href: "/courses" },
] as const;
const companyLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
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
    <footer id="contact" className="relative">
      <div className="h-1 w-full bg-[#f0ebe3]" aria-hidden />

      <div className="bg-white px-4 py-14 md:py-16" style={{ backgroundColor: brand.cream }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
         
          <div className="flex flex-col items-start gap-3">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-neutral-600">
              Transform your life through mindful movement, expert care & holistic healing.
            </p>
          </div>

          {/* Services */}
          <div id="services">
            <h3 className="text-lg font-bold text-neutral-900">Services</h3>
            <ul className="mt-5 space-y-3">
              {servicesLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-[15px] text-neutral-600 no-underline hover:text-neutral-900"
                  >
                    <FiChevronRight className="text-sm shrink-0" style={{ color: GOLD }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div id="company">
            <h3 className="text-lg font-bold text-neutral-900">Company</h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-[15px] text-neutral-600 no-underline hover:text-neutral-900"
                  >
                    <FiChevronRight className="text-sm shrink-0" style={{ color: GOLD }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Contact Us</h3>
            <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-600">
              <li className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-lg" style={{ color: GOLD }} />
                <span>
                  LGF Left side, D–768, opp. market no-2, Block D, Chittaranjan Park, New Delhi 110019
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-lg" style={{ color: GOLD }} />
                <a href="tel:+919717505326" className="text-neutral-600 no-underline hover:underline">
                  +91 9717505326
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="mt-0.5 shrink-0 text-lg" style={{ color: GOLD }} />
                <a
                  href="mailto:physiopilates.12082022@gmail.com"
                  className="break-all text-neutral-600 no-underline hover:underline"
                >
                  physiopilates.12082022@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:bg-neutral-100"
                  style={{ color: GOLD }}
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-sm text-white" style={{ backgroundColor: GOLD }}>
        <p>
          © {new Date().getFullYear()} Physio Pilates. All rights reserved. | Powered by{" "}
          <a href="https://rankmantra.com" className="font-medium underline underline-offset-2">
            Rankmantra
          </a>
        </p>
      </div>
    </footer>
  );
}
