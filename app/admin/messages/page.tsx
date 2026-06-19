"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  EmptyState,
  LoadingState,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

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
  useAdminPage("Messages");

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/admin/messages");
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
    <>
      <PageHeader
        title="Contact Messages"
        description="Manage customer inquiries and contact requests"
      />

      {loading ? (
        <LoadingState />
      ) : messages.length === 0 ? (
        <EmptyState
          title="No Messages Found"
          description="Contact form submissions will appear here"
        />
      ) : (
        <div className="space-y-4">
          {messages.map((item) => (
            <SectionCard key={item._id} noPadding>
              <div className="p-6">
                <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between"
                  style={{ borderColor: "var(--admin-border)" }}
                >
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "var(--page-fg)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      {item.email}
                    </p>
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      Phone Number
                    </p>
                    <p className="mt-1" style={{ color: "var(--page-fg)" }}>
                      {item.phone || "-"}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      Service
                    </p>
                    <p className="mt-1" style={{ color: "var(--page-fg)" }}>
                      {item.service || "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    Message
                  </p>
                  <div
                    className="mt-2 rounded-[12px] p-5"
                    style={{
                      backgroundColor: "var(--admin-muted)",
                      color: "var(--page-fg)",
                    }}
                  >
                    {item.message}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <AdminButton href={`mailto:${item.email}`}>
                    Reply
                  </AdminButton>
                  <AdminButton variant="danger">Delete</AdminButton>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </>
  );
}
