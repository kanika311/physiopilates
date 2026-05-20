"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { FiActivity } from "react-icons/fi";
import { GiLotus } from "react-icons/gi";
import { MdOutlinePsychology } from "react-icons/md";
import { brand } from "@/lib/brand";

const GOLD_HEX = "#b0976a";
const CYAN_BORDER = "#7dd8e0";

type PhilosophyCard = {
  title: string;
  titleColor: string;
  text: string;
  Icon: IconType;
};

const cards: PhilosophyCard[] = [
  {
    title: "Mindful Movement",
    titleColor: GOLD_HEX,
    text: "We blend awareness with precision — every motion is intentional, every breath restorative.",
    Icon: FiActivity,
  },
  {
    title: "Science-Backed Care",
    titleColor: GOLD_HEX,
    text: "Our programs are built on proven physiotherapy principles, ensuring safety and real results.",
    Icon: MdOutlinePsychology,
  },
  {
    title: "Holistic Healing",
    titleColor: brand.tealAccent,
    text: "We treat the whole person — body, mind, and energy — to restore balance and long-term vitality.",
    Icon: GiLotus,
  },
];

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="bg-[#fafafa] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 uppercase"
            style={{ borderColor: CYAN_BORDER }}
          >
            <span className="text-[13px]" style={{ color: GOLD_HEX }}>
              ●
            </span>
            <span className="text-[10px] font-semibold tracking-[0.28em]" style={{ color: GOLD_HEX }}>
              OUR PHILOSOPHY
            </span>
          </div>

          <h2
            className="mx-auto mt-8 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-[3.05rem]"
            style={{ color: GOLD_HEX }}
          >
            Where <span style={{ color: brand.tealAccent }}>Science</span> Meets Movement, and Healing
            Finds Flow
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: GOLD_HEX, opacity: 0.92 }}>
            At{" "}
            <span className="font-semibold" style={{ color: brand.tealAccent }}>
              Physio Pilates
            </span>
            , we believe movement is medicine — when guided mindfully and supported by science. Our
            approach unites clinical expertise with the restorative power of pilates to create a
            balanced path to recovery, strength, and inner alignment.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed md:text-xl" style={{ color: GOLD_HEX, opacity: 0.92 }}>
            Every body tells a story, and our philosophy is built on listening — to your body&apos;s
            needs, your goals, and your rhythm. We empower clients to take ownership of their
            wellness journey through awareness, consistency, and compassion.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map(({ title, titleColor, text, Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-3xl bg-white px-8 py-10 text-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)]"
            >
              <Icon className="text-5xl" style={{ color: brand.tealAccent }} aria-hidden />
              <h3 className="mt-6 text-xl font-bold" style={{ color: titleColor }}>
                {title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: GOLD_HEX, opacity: 0.88 }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="#contact"
            className="rounded-full px-12 py-4 text-[15px] font-bold text-white shadow-lg transition-opacity hover:opacity-93"
            style={{ backgroundColor: GOLD_HEX }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
