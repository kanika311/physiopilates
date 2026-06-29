"use client";

import { useEffect, useState } from "react";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
  openingHoursLines,
} from "@/lib/contact";
import MailtoLink from "@/components/MailtoLink";
import { brand } from "@/lib/brand";

const ICON_WRAP =
  "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl";

type OpeningHour = { label: string; value: string };

function telHref(display: string) {
  const digits = display.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+${digits}`;
}

export default function ContactInformationSection() {
  const [info, setInfo] = useState({
    address: contactAddressPlain,
    phone: contactPhoneDisplay,
    email: contactEmailDisplay,
    openingHours: openingHoursLines as OpeningHour[],
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/contact-info", { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json?.success || !json.data) return;
        const d = json.data;
        setInfo((prev) => ({
          address: d.address || prev.address,
          phone: d.phone || prev.phone,
          email: d.email || prev.email,
          openingHours:
            Array.isArray(d.openingHours) && d.openingHours.length
              ? d.openingHours
              : prev.openingHours,
        }));
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pr-2 md:max-w-xl">
      <h2 className="!text-[clamp(1.5rem,3vw,1.85rem)] font-semibold" style={{ color: brand.navy }}>
        Contact Information
      </h2>
      <ul className="mt-5 space-y-5 text-[15px] leading-snug" style={{ color: brand.textBody }}>
        <li className="flex gap-4">
          <span className={ICON_WRAP} style={{ backgroundColor: brand.mintBg }} aria-hidden>
            <FiMapPin className="text-xl" style={{ color: brand.primary }} aria-hidden />
          </span>
          <span className="pt-1">{info.address}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className={ICON_WRAP} style={{ backgroundColor: brand.mintBg }} aria-hidden>
            <FiPhone className="text-xl" style={{ color: brand.primary }} aria-hidden />
          </span>
          <a
            href={`tel:${telHref(info.phone)}`}
            className="pt-2 font-semibold no-underline transition-colors hover:text-[#0F6D6D]"
            style={{ color: brand.navy }}
          >
            {info.phone}
          </a>
        </li>
        <li className="flex items-start gap-4">
          <span className={ICON_WRAP} style={{ backgroundColor: brand.mintBg }} aria-hidden>
            <FiMail className="text-xl" style={{ color: brand.primary }} aria-hidden />
          </span>
          <MailtoLink
            email={info.email}
            className="min-w-0 pt-2 text-[15px] font-semibold leading-snug no-underline transition-colors hover:text-[#0F6D6D] sm:text-base"
            style={{ color: brand.navy }}
          />
        </li>
        <li className="flex gap-4">
          <span className={ICON_WRAP} style={{ backgroundColor: brand.mintBg }} aria-hidden>
            <FiClock className="text-xl" style={{ color: brand.primary }} aria-hidden />
          </span>
          <div className="space-y-2 pt-0.5">
            <p className="font-semibold" style={{ color: brand.navy }}>
              Opening Hours
            </p>
            <dl className="space-y-1.5">
              {info.openingHours.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="font-medium sm:w-28 sm:shrink-0" style={{ color: brand.primary }}>
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </li>
      </ul>
    </div>
  );
}
