"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Service {
  _id: string;
  name: string;
  slug: string;
  image: string;
  order: number;
  status: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();

      if (data.success) {
        setServices(data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      fetchServices();
    }
  };

  if (loading) {
    return <h2 className="p-10">Loading...</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <Link
          href="/admin/services/add"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Service
        </Link>
      </div>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">Image</th>

            <th className="border p-3">
              Name
            </th>

            <th className="border p-3">
              Slug
            </th>

            <th className="border p-3">
              Order
            </th>

            <th className="border p-3">
              Status
            </th>

            <th className="border p-3">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {services.map((service) => (

            <tr key={service._id}>

              <td className="border p-2">

                <img
                  src={service.image}
                  width={60}
                  height={60}
                  alt=""
                  className="rounded"
                />

              </td>

              <td className="border p-2">
                {service.name}
              </td>

              <td className="border p-2">
                {service.slug}
              </td>

              <td className="border p-2">
                {service.order}
              </td>

              <td className="border p-2">

                {service.status ? (
                  <span className="text-green-600">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600">
                    Inactive
                  </span>
                )}

              </td>

              <td className="border p-2">

                <Link
                  href={`/admin/services/edit/${service._id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    deleteService(service._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}