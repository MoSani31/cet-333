import { LoginForm } from "@/components/admin/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin sign in" };

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-white">Admin</h1>
      <p className="mt-1 text-sm text-slate-400">Sign in to read messages sent from the contact form.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
      <p className="mt-8 text-sm text-slate-500">
        <Link href="/" className="text-cyan-500 hover:underline">
          Back to site
        </Link>
      </p>
    </div>
  );
}
