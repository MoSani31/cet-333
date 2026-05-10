import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Gallery" };

const photos = [
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", alt: "Event stage with audience" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", alt: "Workshop in progress" },
  { src: "https://images.unsplash.com/photo-1544531586-fde5298c49ab?w=800&q=80", alt: "Networking at a stand" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", alt: "Team meeting with laptops" },
] as const;

const upcoming = [
  { name: "North East digital workplace meet-up", when: "June 2026" },
  { name: "AI safety & support desk design (webinar)", when: "Jul 2026" },
] as const;

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Gallery"
        subtitle="Photos from events we've been part of, plus a few dates coming up if you'd like to say hello in person."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {photos.map((p) => (
          <figure
            key={p.src}
            className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40"
          >
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
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Upcoming events</h2>
        <ul className="mt-4 space-y-2 text-slate-300">
          {upcoming.map((e) => (
            <li key={e.name} className="flex flex-wrap items-baseline justify-between gap-2">
              <span>{e.name}</span>
              <span className="text-sm text-cyan-400/90">{e.when}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
