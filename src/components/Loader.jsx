import React from 'react';

export default function Loader({ type = 'card', count = 4 }) {
  if (type === 'page') {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-brand-red"></div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-[#1f1f1f] bg-[#161616] p-3 space-y-4 animate-skeleton">
            <div className="aspect-square w-full rounded-xl bg-zinc-900" />
            <div className="space-y-2">
              <div className="h-3 w-1/3 rounded bg-zinc-800" />
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-3 w-2/3 rounded bg-zinc-800" />
            </div>
            <div className="h-8 w-full rounded-lg bg-zinc-800" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-skeleton w-full">
      <div className="h-8 w-1/4 rounded bg-zinc-800" />
      <div className="h-32 w-full rounded-xl bg-zinc-800" />
      <div className="h-4 w-2/3 rounded bg-zinc-800" />
    </div>
  );
}
