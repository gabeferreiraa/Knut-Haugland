'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Toast from "@/components/ui/Toast";
import Nav from "@/components/Nav";
import { useLanguage } from "@/lib/language-context";
import translations from "@/lib/translations";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  address: {
    address: string;
    state: string;
    postalCode: string;
  };
}

export default function SupportPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<UserFormValues>({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    address: {
      address: "",
      state: "",
      postalCode: ""
    },
  });

  const updateField = (name: string, value: string) => {
    if (name.startsWith("address.")) {
      const key = name.replace("address.", "") as keyof UserFormValues["address"];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value } as UserFormValues));
  };

  const renderParagraph = (text: string, index: number) => {
    if (text.includes('{kipLink}') || text.includes('{jeremyLink}')) {
      const parts = text.split(/(\{kipLink\}|\{jeremyLink\})/);
      return (
        <p key={index}>
          {parts.map((part, i) => {
            if (part === '{kipLink}') {
              return (
                <Link key={i} href="https://www.imdb.com/name/nm2329650/" target="_blank" className="hover:text-black underline">
                  Kip Prestholdt
                </Link>
              );
            }
            if (part === '{jeremyLink}') {
              return (
                <Link key={i} href="https://history.ucsd.edu/people/faculty/prestholdt.html" target="_blank" className="hover:text-black underline">
                  Jeremy Prestholdt
                </Link>
              );
            }
            return part;
          })}
        </p>
      );
    }
    return <p key={index}>{text}</p>;
  };

  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="px-4 sm:px-8 pb-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Full-width statement */}
          <div className="bg-white text-black py-8">
            <h1 className="text-2xl font-bold">{t.producersNote}</h1>
            <div className="mt-5 space-y-4 text-sm leading-relaxed tracking-normal text-black/85">
              {t.producersParagraphs.map((text, i) => renderParagraph(text, i))}

              <p className="pt-2 text-black/85">
                {t.sincereThanks}
                <br />
                <span className="font-medium">{t.kipJeremy}</span>
              </p>
            </div>
          </div>

          {/* Image and CTA Section - Side by Side */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image on the left */}
            <div className="w-full">
              <Image
                src={"/images/img002.jpeg"}
                height={800}
                width={800}
                alt={t.imageCaption}
                className="w-full h-auto"
              />
              <p className="text-sm text-black italic mt-2">{t.imageCaption}</p>
            </div>

            {/* CTA and contact info on the right */}
            <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">
                  {t.letsConnect}
                </h2>
                <p className="text-sm text-black/60 mb-6 max-w-md">
                  {t.connectDescription}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90 transition-colors shadow-lg w-full sm:w-auto"
                >
                  {t.getInTouch}
                </button>
              </div>

              {/* Contact info */}
              <div className="pt-6 border-t border-black/10 w-full">
                <p className="text-xs font-medium text-black/50 uppercase tracking-wider mb-3">
                  {t.reachOutDirectly}
                </p>
                <div className="space-y-2 text-sm text-black/70">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className="font-medium">{t.email}:</span>
                    <a href="mailto:kip@agent7film.com" className="hover:text-black underline">
                      kip@agent7film.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 overflow-y-auto overflow-x-hidden"
          onClick={() => !isSubmitting && setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div
              className="bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-black mb-4">{t.getInTouch}</h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);

                  try {
                    const res = await fetch("/api/lead", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(form),
                    });

                    const text = await res.text();
                    console.log("API response text:", text);

                    let json: any = null;
                    try {
                      json = text ? JSON.parse(text) : null;
                    } catch (parseErr) {
                      console.error("Failed to parse JSON:", parseErr);
                    }

                    if (!res.ok) {
                      console.error("API error status:", res.status);
                      console.error("API raw response:", text);
                      throw new Error(json?.error ?? `Request failed (${res.status})`);
                    }

                    if (!json) {
                      console.error("API returned empty body:", text);
                      throw new Error("Server returned no JSON.");
                    }

                    console.log("created user:", json.user?.id);
                    setIsModalOpen(false);
                    setToastOpen(true);

                    // Reset form
                    setForm({
                      firstName: "",
                      lastName: "",
                      title: "",
                      company: "",
                      email: "",
                      phone: "",
                      address: {
                        address: "",
                        state: "",
                        postalCode: ""
                      },
                    });

                  } catch (err) {
                    console.error("Form submission error:", err);
                    alert("Failed to submit form. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label={t.firstName} name="firstName" value={form.firstName} onChange={updateField} required />
                  <Field label={t.lastName} name="lastName" value={form.lastName} onChange={updateField} required />
                  <Field label={t.title} name="title" value={form.title} onChange={updateField} />

                  <Field label={t.companyOrg} name="company" fullWidth value={form.company} onChange={updateField} />
                  <Field label={t.emailLabel} name="email" type="email" fullWidth value={form.email} onChange={updateField} required />
                  <Field label={t.phoneNumber} name="phone" type="tel" value={form.phone} onChange={updateField} />

                  <Field label={t.address} name="address.address" colSpan={2} value={form.address.address} onChange={updateField} />
                  <Field label={t.state} name="address.state" value={form.address.state} onChange={updateField} />
                  <Field label={t.zip} name="address.postalCode" value={form.address.postalCode} onChange={updateField} />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="rounded-md bg-black/10 px-5 py-2 text-sm font-medium text-black hover:bg-black/20 transition-colors disabled:opacity-50"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t.submitting : t.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={t.formSuccess}
      />
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  fullWidth = false,
  colSpan = 1,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  fullWidth?: boolean;
  colSpan?: number;
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
}) {
  const spanClass = fullWidth ? "sm:col-span-3" : colSpan === 2 ? "sm:col-span-2" : "";

  return (
    <label className={`block ${spanClass}`}>
      <span className="block text-xs font-medium text-black/60 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
      />
    </label>
  );
}
