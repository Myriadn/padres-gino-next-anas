'use client'

import { useState, type ReactNode } from 'react'

export default function DismissibleBanner({
  children,
}: {
  children: ReactNode
}) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <aside className="relative">
      {children}

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/15 px-3 py-1 text-sm font-semibold text-white hover:bg-white/25"
      >
        Tutup
      </button>
    </aside>
  )
}
