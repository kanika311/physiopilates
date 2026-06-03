"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactPage() {
  const [contacts, setContacts] =
    useState<Contact[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedMessage, setSelectedMessage] =
    useState<Contact | null>(null);


const fetchContacts = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "/api/contact"
    );

    console.log(
      "Contacts Response:",
      res.data
    );

    if (res.data.success) {
      setContacts(
        res.data.data || []
      );
    } else {
      setContacts([]);
    }
  } catch (error) {
    console.error(error);
    setContacts([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchContacts();
}, []);




  const deleteContact = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this contact?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/contact/${id}`
      );

      setContacts((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="min-w-0 flex-1 lg:ml-72">
        <AdminHeader />

        <div className="mt-16 p-4 md:p-6 lg:mt-0">
          {/* Header */}
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
            <h1 className="text-3xl font-bold md:text-5xl">
              Contact Leads
            </h1>

            <p className="mt-3 text-white/80">
              Manage customer enquiries and
              leads.
            </p>
          </div>

          {/* Content */}
          <div className="rounded-3xl bg-white shadow-lg">
            {loading ? (
              <div className="p-10 text-center">
                Loading...
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-slate-50">
                        <th className="p-4 text-left">
                          Name
                        </th>

                        <th className="p-4 text-left">
                          Email
                        </th>

                        <th className="p-4 text-left">
                          Phone
                        </th>

                        <th className="p-4 text-left">
                          Service
                        </th>

                        <th className="p-4 text-left">
                          Status
                        </th>

                        <th className="p-4 text-left">
                          Date
                        </th>

                        <th className="p-4 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map(
                        (contact) => (
                          <tr
                            key={
                              contact._id
                            }
                            className="border-b hover:bg-slate-50"
                          >
                            <td className="p-4">
                              {
                                contact.name
                              }
                            </td>

                            <td className="p-4">
                              {
                                contact.email
                              }
                            </td>

                            <td className="p-4">
                              {
                                contact.phone
                              }
                            </td>

                            <td className="p-4">
                              {
                                contact.service
                              }
                            </td>

                            <td className="p-4">
                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                                {
                                  contact.status
                                }
                              </span>
                            </td>

                            <td className="p-4">
                              {new Date(
                                contact.createdAt
                              ).toLocaleDateString()}
                            </td>

                            <td className="p-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() =>
                                    setSelectedMessage(
                                      contact
                                    )
                                  }
                                  className="rounded-xl bg-blue-600 px-4 py-2 text-white"
                                >
                                  View
                                </button>

                                <button
                                  onClick={() =>
                                    deleteContact(
                                      contact._id
                                    )
                                  }
                                  className="rounded-xl bg-red-600 px-4 py-2 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 p-4 lg:hidden">
                  {contacts.map(
                    (contact) => (
                      <div
                        key={
                          contact._id
                        }
                        className="rounded-2xl border p-4"
                      >
                        <h3 className="font-bold">
                          {
                            contact.name
                          }
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          {
                            contact.email
                          }
                        </p>

                        <p className="text-sm text-slate-500">
                          {
                            contact.phone
                          }
                        </p>

                        <p className="mt-2">
                          {
                            contact.service
                          }
                        </p>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() =>
                              setSelectedMessage(
                                contact
                              )
                            }
                            className="flex-1 rounded-xl bg-blue-600 py-2 text-white"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              deleteContact(
                                contact._id
                              )
                            }
                            className="flex-1 rounded-xl bg-red-600 py-2 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {contacts.length === 0 && (
                  <div className="p-10 text-center">
                    No Contact Leads Found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">
              Contact Details
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong>{" "}
                {selectedMessage.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedMessage.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedMessage.phone}
              </p>

              <p>
                <strong>Service:</strong>{" "}
                {selectedMessage.service}
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <div className="rounded-xl bg-slate-100 p-4">
                {selectedMessage.message}
              </div>
            </div>

            <button
              onClick={() =>
                setSelectedMessage(null)
              }
              className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}