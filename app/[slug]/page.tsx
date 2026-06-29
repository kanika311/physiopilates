import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import DbServicePage from "@/components/services/DbServicePage";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug, status: true }).lean<any>();

  if (!service) return { title: "Service Not Found" };

  return {
    title: service.seoTitle || service.name,
    description: service.seoDescription || service.shortDescription,
    keywords: service.seoKeywords,
  };
}

export default async function TopLevelServicePage({ params }: Props) {
  const { slug } = await params;
  return <DbServicePage slug={slug} />;
}
