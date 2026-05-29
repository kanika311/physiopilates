import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import {
  contactAddressPlain,
  contactEmailDisplay,
  contactPhoneDisplay,
  contactPhoneHref,
  openingHoursLines,
} from "@/lib/contact";
import MailtoLink from "@/components/MailtoLink";

const ICON_WRAP =
  "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0e6] dark:bg-slate-800";

export default function ContactInformationSection() {
  return (
    <div className="pr-2 md:max-w-xl">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white sm:text-[1.35rem]">Contact Information</h2>
      <ul className="mt-8 space-y-7 text-[15px] leading-relaxed text-neutral-700 dark:text-slate-300">
        <li className="flex gap-4">
          <span className={ICON_WRAP} aria-hidden>
            <FiMapPin className="text-xl text-[#c09e6b] dark:text-emerald-300" aria-hidden />
          </span>
          <span className="pt-1">{contactAddressPlain}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className={ICON_WRAP} aria-hidden>
            <FiPhone className="text-xl text-[#c09e6b] dark:text-emerald-300" aria-hidden />
          </span>
          <a
            href={`tel:${contactPhoneHref}`}
            className="pt-2 font-medium text-neutral-800 no-underline hover:underline dark:text-slate-100 dark:hover:text-white"
          >
            {contactPhoneDisplay}
          </a>
        </li>
        <li className="flex items-start gap-4">
          <span className={ICON_WRAP} aria-hidden>
            <FiMail className="text-xl text-[#c09e6b] dark:text-emerald-300" aria-hidden />
          </span>
          <MailtoLink
            email={contactEmailDisplay}
            className="min-w-0 pt-2 text-[15px] font-semibold leading-snug text-neutral-800 no-underline hover:underline dark:text-slate-100 dark:hover:text-white sm:text-base"
          />
        </li>
        <li className="flex gap-4">
          <span className={ICON_WRAP} aria-hidden>
            <FiClock className="text-xl text-[#c09e6b] dark:text-emerald-300" aria-hidden />
          </span>
          <div className="space-y-2 pt-0.5">
            <p className="font-semibold text-neutral-900 dark:text-white">Opening Hours</p>
            <dl className="space-y-1.5">
              {openingHoursLines.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="font-medium text-neutral-700 dark:text-slate-200 sm:w-28 sm:shrink-0">{label}</dt>
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
