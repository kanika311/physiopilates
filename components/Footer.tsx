"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FiChevronRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
} from "@/lib/contact";
import { brand } from "@/lib/brand";
import MailtoLink from "@/components/MailtoLink";
import PremiumButton from "@/components/luxury/PremiumButton";

const TEAL = brand.primary;

const footerSans = "font-[family-name:var(--font-inter),ui-sans-serif,system-ui,sans-serif]";

type FooterLinkItem = { label: string; href: string };

const BUILTIN_SERVICE_LINKS: FooterLinkItem[] = [
  { label: "Physiotherapy", href: "/physiotherapy" },
  { label: "Pilates", href: "/pilates" },
  { label: "Yoga", href: "/yoga" },
  { label: "Therapy", href: "/therapy" },
];
const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blogs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;

type SocialItem = {
  Icon: IconType;
  href: string;
  label: string;
};

const DEFAULT_SOCIALS = {
  instagram: "https://www.instagram.com/pphysiopilates?igsh=aTN1c3VzNndrdDJ5",
  facebook: "https://www.facebook.com/pphysiopilates/",
  linkedin:
    "https://www.linkedin.com/in/dr-surbhi-silori-pt-471630b4?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  youtube: "https://youtube.com/@physiopilates6321?si=w8CytJCQKXfD-P-f",
};

const DEFAULT_FOOTER = {
  tagline:
    "Transform your life through mindful movement, expert care & holistic healing.",
  address: contactAddressPlain,
  phone: contactPhoneDisplay,
  email: contactEmailDisplay,
  ...DEFAULT_SOCIALS,
  copyright: "Physio Pilates| Powered by JCRM Technologies",
};

type FooterContent = typeof DEFAULT_FOOTER;

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={`${footerSans} group relative inline-flex items-center gap-2 text-[17px] font-semibold no-underline transition-colors`}
      style={{ color: brand.textSubtitle }}
    >
      <FiChevronRight className="shrink-0 text-base transition-transform group-hover:translate-x-0.5" style={{ color: TEAL }} aria-hidden />
      <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#0F6D6D] after:transition-all group-hover:after:w-full">
        {label}
      </span>
    </Link>
  );
}

export default function Footer() {
  const pathname = usePathname() ?? "";
  const isContactPage = pathname === "/contact";

  const [content, setContent] = useState<FooterContent>(DEFAULT_FOOTER);
  const [serviceLinks, setServiceLinks] = useState<FooterLinkItem[]>([
    ...BUILTIN_SERVICE_LINKS,
    { label: "Courses", href: "/courses" },
  ]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/footer-settings", { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json?.success || !json.data) return;
        const d = json.data;
        setContent({
          tagline: d.tagline || DEFAULT_FOOTER.tagline,
          address: d.address || DEFAULT_FOOTER.address,
          phone: d.phone || DEFAULT_FOOTER.phone,
          email: d.email || DEFAULT_FOOTER.email,
          instagram: d.instagram || DEFAULT_FOOTER.instagram,
          facebook: d.facebook || DEFAULT_FOOTER.facebook,
          linkedin: d.linkedin || DEFAULT_FOOTER.linkedin,
          youtube: d.youtube || DEFAULT_FOOTER.youtube,
          copyright: d.copyright || DEFAULT_FOOTER.copyright,
        });
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json?.success || !Array.isArray(json.data)) return;

        const links: FooterLinkItem[] = [...BUILTIN_SERVICE_LINKS];
        const seen = new Set(links.map((l) => l.href.toLowerCase()));

        json.data
          .filter((s: any) => s?.status !== false && s?.slug)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
          .forEach((s: any) => {
            const href = `/${String(s.slug).toLowerCase()}`;
            if (!seen.has(href)) {
              links.push({ label: s.name || s.slug, href });
              seen.add(href);
            }
          });

        links.push({ label: "Courses", href: "/courses" });
        setServiceLinks(links);
      } catch {
        /* keep default service links */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const phoneHref = `+${content.phone.replace(/\D/g, "")}`;

  const socialLinks: SocialItem[] = [
    { Icon: FaInstagram, href: content.instagram, label: "Instagram" },
    { Icon: FaFacebookF, href: content.facebook, label: "Facebook" },
    { Icon: FaLinkedinIn, href: content.linkedin, label: "LinkedIn" },
    { Icon: FaYoutube, href: content.youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer id="contact" className={`relative ${footerSans}`}>
      <div className="h-px w-full" style={{ backgroundColor: brand.border }} aria-hidden />

      <div className="luxury-section bg-white px-5 sm:px-8">
        <div className="mx-auto grid min-w-0 max-w-[1320px] gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex min-w-0 flex-col items-start gap-3 lg:col-span-1">
            <Image src="/logo.png" alt="Physio Pilates" width={140} height={140} className="h-auto w-[120px] sm:w-[132px]" />
            <p className="mt-2 max-w-md body-text !text-[17px]">
              {content.tagline}
            </p>
            <div className="mt-4">
              <PremiumButton href="/contact" className="px-6 py-2.5 text-[13px]">
                Book Appointment
              </PremiumButton>
            </div>
          </div>

          <div id="services" className="min-w-0">
            <h3 className={`${footerSans} text-base font-semibold`} style={{ color: brand.navy }}>
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>

          <div id="company" className="min-w-0">
            <h3 className={`${footerSans} text-base font-semibold`} style={{ color: brand.navy }}>
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className={`${footerSans} text-base font-semibold`} style={{ color: brand.navy }}>
              {isContactPage ? "Connect with us" : "Contact Us"}
            </h3>
            {isContactPage ? (
              <p className={`${footerSans} mt-5 max-w-sm text-[15px] font-medium leading-relaxed`} style={{ color: brand.textMuted }}>
                Address, phone, and email are listed in the section above — follow us below for updates and reels.
              </p>
            ) : (
              <ul className="mt-5 space-y-4 text-[15px] leading-relaxed">
                <li className="flex gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-lg" style={{ color: TEAL }} aria-hidden />
                  <address className="min-w-0 flex-1 not-italic leading-relaxed [overflow-wrap:anywhere]">
                    <span className="font-semibold text-[14px] sm:text-[15px]" style={{ color: brand.textBody }}>
                      {content.address}
                    </span>
                  </address>
                </li>
                <li className="flex min-w-0 items-center gap-3">
                  <FiPhone className="shrink-0 text-lg" style={{ color: TEAL }} aria-hidden />
                  <a
                    href={`tel:${phoneHref}`}
                    className="min-w-0 font-semibold no-underline transition-colors hover:underline"
                    style={{ color: brand.textBody }}
                  >
                    {content.phone}
                  </a>
                </li>
                <li className="flex min-w-0 items-start gap-3">
                  <FiMail className="mt-0.5 shrink-0 text-lg" style={{ color: TEAL }} aria-hidden />
                  <MailtoLink
                    email={content.email}
                    className="min-w-0 flex-1 font-semibold leading-snug text-[#222222] underline underline-offset-4 decoration-neutral-400/80 transition-colors hover:decoration-[#0F6D6D] sm:text-[15px]"
                  />
                </li>
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border transition-colors"
                  style={{ borderColor: brand.border, color: brand.primary }}
                  whileHover={{ scale: 1.1, backgroundColor: brand.mintBg }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${footerSans} px-5 py-4 text-center text-[13px] font-medium leading-snug text-white sm:py-[1.125rem] sm:text-sm`}
        style={{ backgroundColor: brand.primary }}
      >
        <p className="mx-auto max-w-4xl">
          © {new Date().getFullYear()} {content.copyright}
        </p>
      </div>
    </footer>
  );
}
