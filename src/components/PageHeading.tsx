type Props = { title: string; subtitle?: string };

export function PageHeading({ title, subtitle }: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  );
}
