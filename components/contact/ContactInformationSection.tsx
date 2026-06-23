import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
  contactPhoneHref,
  openingHoursLines,
} from "@/lib/contact";
import MailtoLink from "@/components/MailtoLink";
import { brand } from "@/lib/brand";

const ICON_WRAP =
  "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl";

export default function ContactInformationSection() {
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
          <span className="pt-1">{contactAddressPlain}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className={ICON_WRAP} style={{ backgroundColor: brand.mintBg }} aria-hidden>
            <FiPhone className="text-xl" style={{ color: brand.primary }} aria-hidden />
          </span>
          <a
            href={`tel:${contactPhoneHref}`}
            className="pt-2 font-semibold no-underline transition-colors hover:text-[#0F6D6D]"
            style={{ color: brand.navy }}
          >
            {contactPhoneDisplay}
          </a>
        </li>
        <li className="flex items-start gap-4">
          <span className={ICON_WRAP} style={{ backgroundColor: brand.mintBg }} aria-hidden>
            <FiMail className="text-xl" style={{ color: brand.primary }} aria-hidden />
          </span>
          <MailtoLink
            email={contactEmailDisplay}
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
              {openingHoursLines.map(({ label, value }) => (
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
