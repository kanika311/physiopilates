"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
  pathnameMatch: string;
  type: "about" | "service" | "other";
};

export default function HeaderSettingsPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    siteLogo: "",
    headerBgColor: "#ffffff",
    menuTextColor: "#222222",
    menuHoverColor: "#c89b3c",
    activeMenuColor: "#c89b3c",
    buttonBgColor: "#c89b3c",
    buttonTextColor: "#ffffff",

  navLinks: [
  {
    label: "Home",
    href: "/",
    pathnameMatch: "/",
    type: "other",
  },
] as NavLink[],
  });

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      const res = await fetch("/api/admin/header-settings");
      const data = await res.json();

      if (data.success && data.data) {
        setForm({
          siteLogo: data.data.siteLogo || "",
          headerBgColor:
            data.data.headerBgColor || "#ffffff",
          menuTextColor:
            data.data.menuTextColor || "#222222",
          menuHoverColor:
            data.data.menuHoverColor || "#c89b3c",
          activeMenuColor:
            data.data.activeMenuColor || "#c89b3c",
          buttonBgColor:
            data.data.buttonBgColor || "#c89b3c",
          buttonTextColor:
            data.data.buttonTextColor || "#ffffff",

         navLinks:
  data.data.navLinks?.length
    ? data.data.navLinks
    : [
        {
          label: "Home",
          href: "/",
          pathnameMatch: "/",
          type: "other",
        },
      ],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogoUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        siteLogo: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

const addNavLink = () => {
  setForm((prev) => ({
    ...prev,
    navLinks: [
      ...prev.navLinks,
      {
        label: "",
        href: "",
        pathnameMatch: "",
        type: "other",
      },
    ],
  }));
};

  const updateNavLink = (
    index: number,
    field: keyof NavLink,
    value: string
  ) => {
    const updated = [...form.navLinks];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({
      ...form,
      navLinks: updated,
    });
  };

  const removeNavLink = (
    index: number
  ) => {
    setForm({
      ...form,
      navLinks:
        form.navLinks.filter(
          (_, i) => i !== index
        ),
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/admin/header-settings",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      alert(data.message);

    } catch (err) {

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg border p-8">

  <h1 className="text-3xl font-bold mb-8">
    Header Settings
  </h1>

  <div className="grid lg:grid-cols-2 gap-8">

    {/* Logo */}

    <div>

      <label className="block font-semibold mb-2">
        Upload Logo
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="w-full border rounded-lg p-3"
      />

      {form.siteLogo && (
        <div className="mt-5">
          <Image
            src={form.siteLogo}
            alt="Logo"
            width={150}
            height={80}
            unoptimized
            className="border rounded-lg p-2"
          />
        </div>
      )}

    </div>

    {/* Header Background */}

    <div>

      <label className="block font-semibold mb-2">
        Header Background
      </label>

      <input
        type="color"
        value={form.headerBgColor}
        onChange={(e)=>
          setForm({
            ...form,
            headerBgColor:e.target.value
          })
        }
        className="w-full h-14"
      />

    </div>

    {/* Menu Text */}

    <div>

      <label className="block font-semibold mb-2">
        Menu Text Color
      </label>

      <input
        type="color"
        value={form.menuTextColor}
        onChange={(e)=>
          setForm({
            ...form,
            menuTextColor:e.target.value
          })
        }
        className="w-full h-14"
      />

    </div>

    {/* Hover */}

    <div>

      <label className="block font-semibold mb-2">
        Hover Color
      </label>

      <input
        type="color"
        value={form.menuHoverColor}
        onChange={(e)=>
          setForm({
            ...form,
            menuHoverColor:e.target.value
          })
        }
        className="w-full h-14"
      />

    </div>

    {/* Active */}

    <div>

      <label className="block font-semibold mb-2">
        Active Menu Color
      </label>

      <input
        type="color"
        value={form.activeMenuColor}
        onChange={(e)=>
          setForm({
            ...form,
            activeMenuColor:e.target.value
          })
        }
        className="w-full h-14"
      />

    </div>

    {/* Button BG */}

    <div>

      <label className="block font-semibold mb-2">
        Button Background
      </label>

      <input
        type="color"
        value={form.buttonBgColor}
        onChange={(e)=>
          setForm({
            ...form,
            buttonBgColor:e.target.value
          })
        }
        className="w-full h-14"
      />

    </div>

    {/* Button Text */}

    <div>

      <label className="block font-semibold mb-2">
        Button Text Color
      </label>

      <input
        type="color"
        value={form.buttonTextColor}
        onChange={(e)=>
          setForm({
            ...form,
            buttonTextColor:e.target.value
          })
        }
        className="w-full h-14"
      />

    </div>

  </div>

  {/* Navigation */}

  <div className="mt-12">

    <div className="flex justify-between items-center mb-6">

      <h2 className="text-2xl font-bold">
        Navigation Menu
      </h2>

      <button
        type="button"
        onClick={addNavLink}
        className="bg-green-600 text-white px-5 py-3 rounded-lg"
      >
        + Add Menu
      </button>

    </div>

    {form.navLinks.map((item,index)=>(
      <div
        key={index}
        className="grid grid-cols-12 gap-3 mb-4"
      >

<input
  className="col-span-3 border rounded-lg p-3"
  placeholder="Menu Label"
  value={item.label}
  onChange={(e) =>
    updateNavLink(
      index,
      "label",
      e.target.value
    )
  }
/>

<input
  className="col-span-3 border rounded-lg p-3"
  placeholder="Path Match (/about)"
  value={item.pathnameMatch}
  onChange={(e) =>
    updateNavLink(
      index,
      "pathnameMatch",
      e.target.value
    )
  }
/>

<select
  className="col-span-2 border rounded-lg p-3"
  value={item.type}
  onChange={(e) =>
    updateNavLink(
      index,
      "type",
      e.target.value
    )
  }
>
  <option value="about">About</option>
  <option value="service">Service</option>
  <option value="other">Other</option>
</select>

    <input
  className="col-span-3 border rounded-lg p-3"
  placeholder="URL (/about)"
  value={item.href}
  onChange={(e) =>
    updateNavLink(
      index,
      "href",
      e.target.value
    )
  }
/>

        <button
          type="button"
          onClick={()=>removeNavLink(index)}
          className="col-span-2 bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>

      </div>
    ))}
      </div>

  {/* Live Preview */}

  <div className="mt-12">

    <h2 className="text-2xl font-bold mb-5">
      Live Preview
    </h2>

    <div className="rounded-xl border overflow-hidden shadow">

      <div
        className="flex items-center justify-between px-8 py-5"
        style={{
          background: form.headerBgColor,
        }}
      >

        <div className="flex items-center gap-10">

          {form.siteLogo ? (
            <Image
              src={form.siteLogo}
              alt="Logo"
              width={150}
              height={60}
              unoptimized
              className="h-14 w-auto object-contain"
            />
          ) : (
            <h2 className="text-3xl font-bold">
              LOGO
            </h2>
          )}

          <div
            className="flex gap-8 text-lg font-medium"
            style={{
              color: form.menuTextColor,
            }}
          >

            {form.navLinks.map((item, index) => (

          <a
  key={index}
  href={item.href}
  className="transition-colors duration-200 hover:opacity-80"
  style={
    index === 0
      ? {
          color: form.activeMenuColor,
        }
      : {
          color: form.menuTextColor,
        }
  }
>
  {item.label}
</a>

            ))}

          </div>

        </div>

        <button
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            background:
              form.buttonBgColor,
            color:
              form.buttonTextColor,
          }}
        >
          Contact Us
        </button>

      </div>

    </div>

  </div>

  {/* Save Button */}

  <div className="mt-10 flex justify-end">

    <button
      type="button"
      onClick={handleSubmit}
      disabled={loading}
      className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
    >
      {loading
        ? "Saving..."
        : "Save Settings"}
    </button>

  </div>

</div>

</div>
);
}