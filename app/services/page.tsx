import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export default async function ServicesPage() {
  await connectDB();

  const services = await Service.find({
    status: true,
  }).sort({ order: 1 });

  return (
    <section className="max-w-7xl mx-auto py-16 px-5">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">
          Our Services
        </h1>

        <p className="text-gray-500 mt-4">
          Professional Healthcare Services
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

        {services.map((service: any) => (

          <div
            key={service._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >

            <Image
              src={service.image}
              alt={service.name}
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {service.name}
              </h2>

              <p className="mt-3 text-gray-600">
                {service.shortDescription}
              </p>

              <Link
                href={`/services/${service.slug}`}
                className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded"
              >
                Read More
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}