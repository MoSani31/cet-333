import { ContactForm } from "@/components/ContactForm";
import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Security Team" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Contact Security Team"
        subtitle="Submit a technical service request with your details and the nature of the security issue. No account is required—we respond by email or phone."
      />
      <p className="mb-8 max-w-2xl text-sm text-slate-500">
        We use what you send here only to respond to your enquiry and to improve our services, and we retain it only as
        long as needed for that purpose. We do not use it to train public AI models.
      </p>
      <ContactForm />
    </main>
  );
}
