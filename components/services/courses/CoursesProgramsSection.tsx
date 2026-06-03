"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  FiCheck,
  FiClock,
  FiPhone,
} from "react-icons/fi";

import { brand } from "@/lib/brand";

const GOLD_CARD = "#b89b72";
const BG = "#faf8f4";

/**
 * COURSE TYPE
 */
type Course = {
  _id: string;

  title: string;

  image: string;

  imageAlt: string;

  duration: string;

  description: string;

  features: string[];

  price: string;
};

export default function CoursesProgramsSection() {
  /**
   * COURSES STATE
   */
  const [courses, setCourses] =
    useState<Course[]>([]);

  /**
   * LOADING STATE
   */
  const [loading, setLoading] =
    useState(true);

  /**
   * FETCH API
   */
  useEffect(() => {
    fetchCourses();
  }, []);

  /**
   * FETCH COURSES
   */
  const fetchCourses =
    async () => {
      try {
        /**
         * API CALL
         */
        const response =
          await fetch(
            "/api/courses",
            {
              method:
                "GET",

              cache:
                "no-store",
            }
          );

        /**
         * JSON RESPONSE
         */
        const result =
          await response.json();

        console.log(
          "COURSES:",
          result
        );

        /**
         * SUCCESS
         */
        if (
          result.success
        ) {
          /**
           * FORMAT DATA
           */
          const formattedCourses =
            result.data.map(
              (
                item: any
              ) => ({
                _id:
                  item._id,

                title:
                  item.title ||
                  "",

                image:
                  item.image,

                imageAlt:
                  item.imageAlt ||
                  item.title,

                duration:
                  item.duration ||
                  "",

                description:
                  item.description ||
                  "",

                features:
                  item.features ||
                  [],

                price:
                  item.price ||
                  "",
              })
            );

          /**
           * SET COURSES
           */
          setCourses(
            formattedCourses
          );
        }
      } catch (error) {
        console.log(
          "Courses Error:",
          error
        );
      } finally {
        /**
         * STOP LOADING
         */
        setLoading(false);
      }
    };

  return (
    <section
      id="courses-programs"
      className="px-4 py-16 md:py-24 lg:py-28"
      style={{
        backgroundColor:
          BG,
      }}
      aria-labelledby="courses-programs-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-5 py-1.5 uppercase"
            style={{
              borderColor:
                "rgba(184,155,114,0.55)",

              backgroundColor:
                "rgba(184,155,114,0.06)",
            }}
          >
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  GOLD_CARD,
              }}
              aria-hidden
            />

            <span
              className="text-[10px] font-semibold tracking-[0.26em]"
              style={{
                color:
                  GOLD_CARD,
              }}
            >
              Our Courses
            </span>
          </div>

          <h2
            id="courses-programs-heading"
            className="mx-auto mt-7 max-w-3xl font-[family-name:var(--font-playfair)] text-[2rem] font-bold tracking-tight sm:text-4xl md:text-[2.4rem]"
            style={{
              color:
                GOLD_CARD,
            }}
          >
            Explore Our
            Teacher
            Training
            Programs
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed"
            style={{
              color:
                brand.textMuted,
            }}
          >
            Gain the
            knowledge,
            confidence,
            and guidance
            to become a
            certified
            instructor.
          </p>
        </header>

        {/* LOADING */}
        {loading && (
          <div className="mt-16 text-center text-neutral-500">
            Loading
            courses...
          </div>
        )}

        {/* COURSES */}
        {!loading && (
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {courses.map(
              (
                course
              ) => (
                <article
                  key={
                    course._id
                  }
                  className="flex flex-col overflow-hidden rounded-[1.75rem] border border-neutral-100/90 bg-white shadow-[0_20px_50px_-32px_rgba(0,0,0,0.18)]"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/10] w-full shrink-0">
                    <Image
                      src={
                        course.image
                      }
                      alt={
                        course.imageAlt
                      }
                      width={600}
                      height={300}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col px-6 pb-8 pt-7 md:px-8">
                    {/* TITLE */}
                    <h3
                      className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-snug md:text-[1.35rem]"
                      style={{
                        color:
                          GOLD_CARD,
                      }}
                    >
                      {
                        course.title
                      }
                    </h3>

                    {/* DURATION */}
                    <p
                      className="mt-3 flex items-center gap-2 text-[14px] font-medium"
                      style={{
                        color:
                          brand.tealIcon,
                      }}
                    >
                      <FiClock
                        className="size-4 shrink-0 opacity-90"
                        aria-hidden
                      />

                      <span>
                        {
                          course.duration
                        }
                      </span>
                    </p>

                    {/* DESCRIPTION */}
                    <p
                      className="mt-4 text-[15px] leading-relaxed"
                      style={{
                        color:
                          "#718096",
                      }}
                    >
                      {
                        course.description
                      }
                    </p>

                    {/* FEATURES */}
                    <ul className="mt-6 space-y-3">
                      {course.features.map(
                        (
                          feature
                        ) => (
                          <li
                            key={
                              feature
                            }
                            className="flex items-start gap-2.5 text-[14px]"
                            style={{
                              color:
                                "#718096",
                            }}
                          >
                            <FiCheck
                              className="mt-0.5 shrink-0 text-base"
                              style={{
                                color:
                                  brand.tealIcon,
                              }}
                              aria-hidden
                            />

                            <span>
                              {
                                feature
                              }
                            </span>
                          </li>
                        )
                      )}
                    </ul>

                    {/* FOOTER */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-7">
                      {/* PRICE */}
                      <p
                        className="font-[family-name:var(--font-playfair)] text-2xl font-bold"
                        style={{
                          color:
                            GOLD_CARD,
                        }}
                      >
                        {
                          course.price
                        }
                      </p>

                      {/* BUTTON */}
                      <Link
                        href="tel:+919717505326"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-semibold text-white shadow-md"
                        style={{
                          backgroundColor:
                            brand.teal,
                        }}
                      >
                        <FiPhone
                          className="size-4"
                          aria-hidden
                        />

                        Call Now
                      </Link>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          courses.length ===
            0 && (
            <p className="mt-16 text-center text-neutral-500">
              No courses
              found.
            </p>
          )}
      </div>
    </section>
  );
}