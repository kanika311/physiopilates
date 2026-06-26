import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  await connectDB();

  const service = await Service.findOne({
    slug: params.slug,
    status: true,
  });

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.seoTitle || service.name,
    description:
      service.seoDescription ||
      service.shortDescription,
    keywords: service.seoKeywords,
  };
}

export default async function ServiceDetails({
  params,
}: Props) {

  await connectDB();

  const service = await Service.findOne({
    slug: params.slug,
    status: true,
  });

  if (!service) {
    notFound();
  }

  const relatedServices = await Service.find({
    _id: { $ne: service._id },
    status: true,
  })
    .limit(3)
    .sort({ order: 1 });

  return (
    <>
      {/* Hero */}

      <section className="bg-blue-700 py-20">

        <div className="max-w-7xl mx-auto px-5">

          <h1 className="text-5xl font-bold text-white">
            {service.name}
          </h1>

          <p className="text-white mt-5">
            {service.shortDescription}
          </p>

        </div>

      </section>

      {/* Content */}

      <section className="max-w-7xl mx-auto py-16 px-5">

        <div className="grid lg:grid-cols-2 gap-12">

          <div>

            <Image
              src={service.image}
              alt={service.name}
              width={700}
              height={500}
              className="rounded-xl object-cover"
            />

          </div>

          <div>

            <h2 className="text-4xl font-bold mb-6">
              {service.name}
            </h2>

            <p className="text-gray-700 leading-8 whitespace-pre-line">
              {service.description}
            </p>

            <Link
              href="/contact"
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg"
            >
              Contact Now
            </Link>

          </div>

        </div>

      </section>

      {/* Related Services */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-5">

          <h2 className="text-4xl font-bold mb-10">
            Related Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {relatedServices.map((item: any) => (

              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow"
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={300}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-2xl font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {item.shortDescription}
                  </p>

                  <Link
                    href={`/services/${item.slug}`}
                    className="inline-block mt-5 text-blue-600 font-semibold"
                  >
                    Read More →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </>
  );
}