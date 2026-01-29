// app/support/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="px-4 sm:px-8 py-6">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-black hover:text-black/70"
          >
            Home
          </Link>
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
                Knut Haugland was hardworking, humble, and deeply private. He avoided the spotlight, rarely gave interviews, and had little interest in telling his own story. As a result, for decades his extraordinary life remained largely unknown and unacknowledged outside of Norway. It wasn't until 2009 — just one year before his death — that Norwegian journalist Svein Sæter published Haugland's full story in his biography Operatøren. Even then, the story did not reach a global audience.
              </p>

              <p>
                In 2025, filmmaker Kip Prestholdt read Operatøren for the first time. What he found was not just a remarkable life but also a story that demanded to be seen by a wider audience. He immediately reached out to his cousin Jeremy Prestholdt, a professor of history at the University of California, San Diego. Friends since childhood, Kip and Jeremy knew this was a journey they needed to take together.
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
                alt="Knut Haugland"
                className="w-full h-auto"
              />
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
                    <a href="mailto:contact@example.com" className="hover:text-black underline">
                      contact@example.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className="font-medium">Phone:</span>
                    <a href="tel:+1234567890" className="hover:text-black">
                      (123) 456-7890
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black/90">
                  Continue the conversation
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-black/40 hover:text-black text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <p className="text-xs leading-5 text-black/60 mb-6">
                Leave your contact information and we'll follow up with the film package and next steps.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="First Name" name="firstName" />
                <Field label="Last Name" name="lastName" />
                <Field label="Title" name="title" />
                <Field label="Company/Organization" name="company" fullWidth />
                <Field label="Email" name="email" type="email" fullWidth />
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Address" name="address" colSpan={2} />
                <Field label="State" name="state" />
                <Field label="Zip" name="zip" />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-black/10 px-5 py-2 text-sm font-medium text-black hover:bg-black/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  fullWidth = false,
  colSpan = 1,
}: {
  label: string;
  name: string;
  type?: string;
  fullWidth?: boolean;
  colSpan?: number;
}) {
  const spanClass = fullWidth ? 'sm:col-span-3' : colSpan === 2 ? 'sm:col-span-2' : '';
  
  return (
    <label className={`block ${spanClass}`}>
      <span className="block text-xs font-medium text-black/60">{label}</span>
      <input
        name={name}
        type={type}
        className="mt-1.5 w-full rounded-md border border-black/10 bg-black/5 px-3 py-2 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
      />
    </label>
  );
}