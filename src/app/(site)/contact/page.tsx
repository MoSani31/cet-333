import { ContactForm } from "@/components/ContactForm";
import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Security Team" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Contact Security Team"
        subtitle="Tell us who you are and what you need. You do not need an account. We reply by email or phone."
      />
      <p className="mb-8 max-w-2xl text-sm text-slate-500">
        We use what you send only to answer your enquiry and to improve how we help clients. We keep it only as long as
        we need for that. We do not feed it into public AI training.
      </p>
      <ContactForm />
    </main>
  );
}
