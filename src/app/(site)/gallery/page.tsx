import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Gallery" };

const photos = [
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Cyber defence workshop session with participants facing the stage",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    alt: "Hands-on security awareness lab with laptops",
  },
  {
    src: "https://images.unsplash.com/photo-1544531586-fde5298c49ab?w=800&q=80",
    alt: "Regional cyber resilience event networking area",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    alt: "Incident response tabletop exercise with facilitators",
  },
] as const;

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Gallery"
        subtitle="Training workshops, awareness sessions, and industry events where CyberNova has supported teams across Southern Africa."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {photos.map((p) => (
          <figure key={p.src} className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <figcaption className="px-3 py-2 text-xs text-slate-500">{p.alt}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
