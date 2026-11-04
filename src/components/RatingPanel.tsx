'use client'

import { useOptimistic, useState, useTransition } from 'react'
import type { RatingSummary } from '@/lib/types'
import { ratePizzaAction } from '@/app/actions'

export default function RatingPanel({
  pizzaId,
  initialSummary,
}: {
  pizzaId: string
  initialSummary: RatingSummary
}) {
  const [summary, setSummary] = useOptimistic(initialSummary)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function submit(formData: FormData) {
    const stars = Number(formData.get('stars'))
    const previousSummary = summary

    const optimisticSummary: RatingSummary = {
      count: previousSummary.count + 1,
      average:
        (previousSummary.average * previousSummary.count + stars) /
        (previousSummary.count + 1),
    }

    setError(null)

    startTransition(async () => {
      setSummary(optimisticSummary)

      const result = await ratePizzaAction(pizzaId, formData)

      if (!result.ok) {
        setSummary(previousSummary)
        setError(result.error)
      }
    })
  }

  // useEffect(() => {
  //   async function load() {
  //     const res = await fetch(`/api/pizzas/${pizzaId}/ratings`)
  //     setSummary((await res.json()) as RatingSummary)
  //   }
  //   void load()
  // }, [pizzaId])

  // async function rate(stars: number) {
  //   setError(null)
  //   const res = await fetch(`/api/pizzas/${pizzaId}/ratings`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ stars }),
  //   })
  //   if (!res.ok) {
  //     setError('Gagal mengirim rating. Coba lagi.')
  //     return
  //   }
  //   setSummary((await res.json()) as RatingSummary)
  // }

  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <h2 className="text-lg font-bold">Rating pelanggan</h2>
      <p className="mt-1 text-ink/70" data-testid="rating-summary">
        {summary
          ? `★ ${summary.average.toFixed(1)} dari ${summary.count} rating`
          : 'Memuat rating…'}
      </p>
      <form action={submit}>
        <div className="mt-4 flex gap-1" aria-label="Beri rating">
          {[1, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              type="submit"
              name="stars"
              value={stars}
              disabled={isPending}
              aria-label={`Beri ${stars} bintang`}
              className="text-3xl text-amber-500 hover:scale-110"
            >
              ★
            </button>
          ))}
        </div>

        {isPending && <p className="mt-3 text-sm text-ink/60">Sending...</p>}

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>
    </section>
  )
}
