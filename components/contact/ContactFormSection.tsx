"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";

export default function ContactFormSection() {
  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  async function submitForm(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const form =
        e.currentTarget;

      const data =
        new FormData(form);

      const payload = {
        name: String(
          data.get("name") || ""
        ),
        email: String(
          data.get("email") || ""
        ),
        phone: String(
          data.get("phone") || ""
        ),
        service: String(
          data.get("service") || ""
        ),
        message: String(
          data.get("message") || ""
        ),
      };

      console.log(
        "Submitting:",
        payload
      );

      const response =
        await axios.post(
          "/api/contact",
          payload
        );

      console.log(
        response.data
      );

      if (
        response.data.success
      ) {
        setSuccess(true);
        form.reset();
      }
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data
          ?.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
          Message sent successfully
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={submitForm}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full rounded-lg border p-3"
        />

        <select
          name="service"
          required
          className="w-full rounded-lg border p-3"
        >
          <option value="">
            Select Service
          </option>

          <option value="Physiotherapy">
            Physiotherapy
          </option>

          <option value="Pilates">
            Pilates
          </option>

          <option value="Yoga">
            Yoga
          </option>
        </select>

        <textarea
          name="message"
          rows={5}
          placeholder="Message"
          required
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          {loading
            ? "Sending..."
            : "Send Message"}
        </button>
      </form>
    </div>
  );
}