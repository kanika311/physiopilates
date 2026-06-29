"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";
import ServiceContentFields, {
  EMPTY_SERVICE_CONTENT,
  type ServiceContent,
} from "@/components/admin/ServiceContentFields";
import { PAGE_HEROES } from "@/lib/pageHeroes";
import { SERVICE_OVERVIEWS } from "@/lib/serviceOverviews";

function defaultsFor(slug: string): ServiceContent {
  const hero = PAGE_HEROES[slug];
  const ov = SERVICE_OVERVIEWS[slug];
  return {
    heroEyebrow: hero?.eyebrow ?? "",
    heroTitle: hero?.title ?? "",
    heroDescription: hero?.description ?? "",
    heroImage: hero?.image ?? "",
    overviewTitle: ov?.title ?? "",
    overviewDescription: ov?.description ?? "",
    overviewImage: ov?.image ?? "",
    overviewBullets: ov?.bullets ?? [],
    overviewLevels: ov?.levels ?? [],
  };
}

export default function BuiltinServiceEditor() {
  useAdminPage("Edit Service");
  const router = useRouter();
  const params = useParams();
  const slug = String(params.slug || "");

  const isValid = !!SERVICE_OVERVIEWS[slug];
  const label = SERVICE_OVERVIEWS[slug]?.label ?? slug;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ServiceContent>(EMPTY_SERVICE_CONTENT);

  useEffect(() => {
    if (!isValid) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const def = defaultsFor(slug);
      try {
        const res = await fetch(`/api/page-content/${slug}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled) return;
        const d = json?.success ? json.data : null;
        setContent({
          heroEyebrow: d?.eyebrow || def.heroEyebrow,
          heroTitle: d?.title || def.heroTitle,
          heroDescription: d?.description || def.heroDescription,
          heroImage: d?.image || def.heroImage,
          overviewTitle: d?.overviewTitle || def.overviewTitle,
          overviewDescription: d?.overviewDescription || def.overviewDescription,
          overviewImage: d?.overviewImage || def.overviewImage,
          overviewBullets:
            Array.isArray(d?.overviewBullets) && d.overviewBullets.length
              ? d.overviewBullets
              : def.overviewBullets,
          overviewLevels:
            Array.isArray(d?.overviewLevels) && d.overviewLevels.length
              ? d.overviewLevels
              : def.overviewLevels,
        });
      } catch {
        if (!cancelled) setContent(def);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, isValid]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        eyebrow: content.heroEyebrow,
        title: content.heroTitle,
        description: content.heroDescription,
        image: content.heroImage,
        overviewTitle: content.overviewTitle,
        overviewDescription: content.overviewDescription,
        overviewImage: content.overviewImage,
        overviewBullets: content.overviewBullets
          .map((b) => b.trim())
          .filter(Boolean),
        overviewLevels: content.overviewLevels
          .map((l) => l.trim())
          .filter(Boolean),
      };
      const res = await fetch(`/api/page-content/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(data.message || "Saved");
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Reset this service page's banner and overview to the original defaults?"
      )
    )
      return;
    try {
      setSaving(true);
      await fetch(`/api/page-content/${slug}`, { method: "DELETE" });
      setContent(defaultsFor(slug));
      alert("Reset to default");
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (!isValid) {
    return (
      <>
        <PageHeader
          title="Service not found"
          description="This built-in service page does not exist."
          action={
            <AdminButton
              variant="outline"
              onClick={() => router.push("/admin/services")}
            >
              <ArrowLeft size={15} />
              Back
            </AdminButton>
          }
        />
      </>
    );
  }

  if (loading) {
    return <LoadingState message="Loading service content..." />;
  }

  return (
    <>
      <PageHeader
        title={`Edit ${label}`}
        description="Update the banner and overview section for this service page"
        action={
          <AdminButton
            variant="outline"
            onClick={() => router.push("/admin/services")}
          >
            <ArrowLeft size={15} />
            Back
          </AdminButton>
        }
      />

      <div className="mt-5 flex flex-col gap-5">
        <ServiceContentFields value={content} onChange={setContent} />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <AdminButton variant="outline" onClick={handleReset} disabled={saving}>
            <RotateCcw size={15} />
            Reset to Default
          </AdminButton>
          <AdminButton
            onClick={handleSave}
            disabled={saving}
            className="!text-white"
            style={{
              background: "linear-gradient(135deg, #0F6D6D 0%, #0c5757 100%)",
              boxShadow: "0 4px 16px rgb(15 109 109 / 0.25)",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </AdminButton>
        </div>
      </div>
    </>
  );
}
