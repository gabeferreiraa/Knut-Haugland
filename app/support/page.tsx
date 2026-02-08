'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Toast from "@/components/ui/Toast";

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

  return (
    <main className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="px-4 sm:px-8 py-3">
        <nav className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center">
          <div className="justify-self-start">
            <Link
              href="/"
              className="text-lg font-medium text-black hover:text-black/70"
            >
              Home
            </Link>
          </div>

          <div className="justify-self-center min-h-[100]">
            <Image
              src="/images/Agent7Logo.png"
              width={200}
              height={100}
              alt="Agent 7 logo"
              hidden
            />
          </div>

          <div />
        </nav>
      </header>

      <section className="px-4 sm:px-8 pb-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Full-width statement */}
          <div className="bg-white text-black py-8">
            <h1 className="text-2xl font-bold">A note from the producers</h1>
            <div className="mt-5 space-y-4 text-sm leading-relaxed tracking-normal text-black/85">
              <p>
                Thank you for watching our teaser trailer. You may have noticed AI generated clips in the video. It is not our intention to use AI video in the film itself but only to use this new technology to convey our vision. For the actual film, we intend to recreate live action scenes.
              </p>

              <p>
                Knut Haugland was hardworking, humble, and deeply private. He avoided the spotlight, rarely gave interviews, and had little interest in telling his own story. As a result, for decades his extraordinary life remained largely unknown and unacknowledged outside of Norway. It wasn't until 2009, just one year before his death, that Norwegian journalist Svein Sæter published Haugland's full story in his biography Operatøren. Even then, the story did not reach a global audience.
              </p>

              <p>
                In 2025, filmmaker {''}
                    <Link href="https://www.imdb.com/name/nm2329650/" target="_blank" className="hover:text-black underline">
                      Kip Prestholdt
                    </Link> read Operatøren for the first time. What he found was not just a remarkable life but also a story that demanded to be seen by a wider audience. He immediately reached out to his cousin{''} <Link href="https://history.ucsd.edu/people/faculty/prestholdt.html" target="_blank" className="hover:text-black underline">
                      Jeremy Prestholdt
                    </Link>, a professor of history at the University of California, San Diego. Friends since childhood, Kip and Jeremy knew this was a journey they needed to take together.
              </p>

              <p>
                This project is under development with the full support and encouragement of the Haugland family and biographer Svein Sæter. They believe the time has come for Haugland's story to be shared with a wider audience.
              </p>

              <p>
                By early summer 2026, we will have a complete film package ready, including a pitch deck, script, production schedule, and budget. We are seeking a Norwegian production partner or partners who share our belief in the importance of Knut Haugland's story and can help us engage with foundations, grants, organizations, and individuals interested in supporting the project.
              </p>

              <p>
                If you would like to continue the conversation and explore how you might be a part of bringing this film to life, please leave your contact information below. We would be excited to connect with you.
              </p>

              <p className="pt-2 text-black/85">
                With sincere thanks,
                <br />
                <span className="font-medium">Kip &amp; Jeremy Prestholdt</span>
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
                alt="Kip Prestholdt (12) standing next to Knut Haugland 1984"
                className="w-full h-auto"
              />
              <p className="text-sm text-black italic mt-2">Kip Prestholdt (12) standing next to Knut Haugland 1984</p>
            </div>
            
            {/* CTA and contact info on the right */}
            <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-4">
                  Let's Connect
                </h2>
                <p className="text-sm text-black/60 mb-6 max-w-md">
                  Interested in learning more about the project? We'd love to hear from you and share our complete film package.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90 transition-colors shadow-lg w-full sm:w-auto"
                >
                  Get in Touch
                </button>
              </div>
              
              {/* Contact info */}
              <div className="pt-6 border-t border-black/10 w-full">
                <p className="text-xs font-medium text-black/50 uppercase tracking-wider mb-3">
                  Or reach out directly
                </p>
                <div className="space-y-2 text-sm text-black/70">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className="font-medium">Email:</span>
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
              <h2 className="text-xl font-semibold text-black mb-4">Get in Touch</h2>
              
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
                  <Field label="First Name" name="firstName" value={form.firstName} onChange={updateField} required />
                  <Field label="Last Name" name="lastName" value={form.lastName} onChange={updateField} required />
                  <Field label="Title" name="title" value={form.title} onChange={updateField} />

                  <Field label="Company/Organization" name="company" fullWidth value={form.company} onChange={updateField} />
                  <Field label="Email" name="email" type="email" fullWidth value={form.email} onChange={updateField} required />
                  <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={updateField} />

                  <Field label="Address" name="address.address" colSpan={2} value={form.address.address} onChange={updateField} />
                  <Field label="State" name="address.state" value={form.address.state} onChange={updateField} />
                  <Field label="Zip" name="address.postalCode" value={form.address.postalCode} onChange={updateField} />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="rounded-md bg-black/10 px-5 py-2 text-sm font-medium text-black hover:bg-black/20 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
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
        message="Form submitted successfully"
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