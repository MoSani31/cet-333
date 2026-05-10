import { ContactForm } from "@/components/ContactForm";
import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Contact us"
        subtitle="Tell us who you are, what you're trying to fix, and how we can reach you. You don't need an account—we'll reply by email or phone."
      />
      <p className="mb-8 max-w-2xl text-sm text-slate-500">
        We use what you send here only to respond to your enquiry and improve our services, and we keep it only as
        long as we need for that. We do not use it to train public AI models.
      </p>
      <ContactForm />
    </main>
  );
}
