"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Feedback() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try{
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitting(false);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        router.push("/thankyou");
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitting(false);
    }
  };

  return (
    <main className="flex items-center bg-white text-black">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT - FORM */}
        <div>
          <h1 className="text-5xl font-bold mb-4">
            Feedback
          </h1>

          <p className="text-gray-600 mb-8 text-lg">
            We value your feedback. Your thoughts help us improve CloudPDF and
             create a better experience for everyone. Please take a moment to share your experience with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              rows={5}
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {submitting ? "Sending..." : "Send Feedback"}
            </button>

          </form>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="flex justify-center lg:justify-end">
        <div className="relative w-full max-w-lg h-[500px] lg:h-[600px]">
          <Image
            src="/feedback.png"
            alt="Feedback illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      </section>
    </main>
  );
}