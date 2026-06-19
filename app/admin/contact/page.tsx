"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminBadge,
  AdminButton,
  AdminModal,
  DataTable,
  EmptyState,
  LoadingState,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

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
  useAdminPage("Contact");

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/contact");
      console.log("Contacts Response:", res.data);
      if (res.data.success) {
        setContacts(res.data.data || []);
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

  const deleteContact = async (id: string) => {
    const confirmDelete = window.confirm("Delete this contact?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/contact/${id}`);
      setContacts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <PageHeader
        title="Contact Leads"
        description="Manage customer enquiries and leads."
      />

      {loading ? (
        <LoadingState />
      ) : contacts.length === 0 ? (
        <EmptyState title="No Contact Leads Found" />
      ) : (
        <>
          <div className="hidden lg:block">
            <DataTable>
              <DataTable.Table>
                <DataTable.Head>
                  <DataTable.HeaderCell>Name</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Email</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Phone</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Service</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Status</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Date</DataTable.HeaderCell>
                  <DataTable.HeaderCell className="text-center">
                    Action
                  </DataTable.HeaderCell>
                </DataTable.Head>
                <DataTable.Body>
                  {contacts.map((contact) => (
                    <DataTable.Row key={contact._id}>
                      <DataTable.Cell>{contact.name}</DataTable.Cell>
                      <DataTable.Cell>{contact.email}</DataTable.Cell>
                      <DataTable.Cell>{contact.phone}</DataTable.Cell>
                      <DataTable.Cell>{contact.service}</DataTable.Cell>
                      <DataTable.Cell>
                        <AdminBadge variant="success">
                          {contact.status}
                        </AdminBadge>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <div className="flex justify-center gap-2">
                          <AdminButton
                            variant="outline"
                            onClick={() => setSelectedMessage(contact)}
                          >
                            View
                          </AdminButton>
                          <AdminButton
                            variant="danger"
                            onClick={() => deleteContact(contact._id)}
                          >
                            Delete
                          </AdminButton>
                        </div>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable.Body>
              </DataTable.Table>
            </DataTable>
          </div>

          <div className="space-y-4 lg:hidden">
            {contacts.map((contact) => (
              <SectionCard key={contact._id} noPadding>
                <div className="p-4">
                  <h3
                    className="font-bold"
                    style={{ color: "var(--page-fg)" }}
                  >
                    {contact.name}
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {contact.email}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {contact.phone}
                  </p>
                  <p className="mt-2" style={{ color: "var(--page-fg)" }}>
                    {contact.service}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <AdminButton
                      variant="outline"
                      fullWidth
                      onClick={() => setSelectedMessage(contact)}
                    >
                      View
                    </AdminButton>
                    <AdminButton
                      variant="danger"
                      fullWidth
                      onClick={() => deleteContact(contact._id)}
                    >
                      Delete
                    </AdminButton>
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        </>
      )}

      {selectedMessage && (
        <AdminModal
          title="Contact Details"
          onClose={() => setSelectedMessage(null)}
        >
          <p>
            <strong>Name:</strong> {selectedMessage.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedMessage.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedMessage.phone}
          </p>
          <p>
            <strong>Service:</strong> {selectedMessage.service}
          </p>
          <p>
            <strong>Message:</strong>
          </p>
          <div
            className="rounded-[12px] p-4"
            style={{ backgroundColor: "var(--admin-muted)" }}
          >
            {selectedMessage.message}
          </div>
        </AdminModal>
      )}
    </>
  );
}
