// 'use client'

import Image from 'next/image'
import Link from 'next/link'
// import { useEffect, useState } from 'react'
import { getPizzaOfTheDay } from '@/lib/data'
import { formatPrice, lowestPrice } from '@/lib/format'
// import type { Pizza } from '@/lib/types'
import DismissibleBanner from './DismissibleBanner'

// New feature from a teammate: a different pizza every day.
// It doesn't build. Your job: make it work AND put each part on the right side.
export default async function PizzaOfTheDay() {
  const pizza = await getPizzaOfTheDay()

  if (!pizza) return null

  //   const [pizza, setPizza] = useState<Pizza | null>(null)
  //   const [dismissed, setDismissed] = useState(false)

  //   useEffect(() => {
  //     void getPizzas().then((pizzas) => {
  //       const day = Math.floor(Date.now() / 86_400_000)
  //       setPizza(pizzas[day % pizzas.length])
  //     })
  //   }, [])

  //   if (dismissed || !pizza) return null

  return (
    <DismissibleBanner>
      <div className="mb-8 flex items-center gap-4 rounded-2xl bg-brand-dark p-4 text-white shadow">
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={96}
          height={96}
          className="size-24 rounded-xl object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Pizza of the Day
          </p>
          <Link
            href={`/pizza/${pizza.id}`}
            className="text-xl font-black hover:underline"
          >
            {pizza.name}
          </Link>
          <p className="text-sm">mulai {formatPrice(lowestPrice(pizza))}</p>
        </div>
        {/* <button
        type="button"
        onClick={() => {
            setDismissed(true)
            onDismiss()
        }}
        className="rounded-lg bg-white/15 px-3 py-1 text-sm font-semibold hover:bg-white/25"
      >
        Tutup
      </button> */}
      </div>
    </DismissibleBanner>
  )
}
