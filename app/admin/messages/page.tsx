"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] =
    useState<MessageItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "/api/admin/messages"
      );

      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="ml-72">
        <AdminHeader title="Contact Messages" />

        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Contact Messages
            </h2>

            <p className="mt-2 text-gray-500">
              Manage customer inquiries and
              contact requests
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-lg font-medium">
                Loading...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-bold">
                No Messages Found
              </h3>

              <p className="mt-2 text-gray-500">
                Contact form submissions will
                appear here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((item) => (
                <div
                  key={item._id}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >
                  {/* Top */}
                  <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.email}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Phone Number
                      </p>

                      <p className="mt-1 text-gray-900">
                        {item.phone || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Service
                      </p>

                      <p className="mt-1 text-gray-900">
                        {item.service || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-500">
                      Message
                    </p>

                    <div className="mt-2 rounded-2xl bg-gray-100 p-5 text-gray-800">
                      {item.message}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <a
                      href={`mailto:${item.email}`}
                      className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Reply
                    </a>

                    <button className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}