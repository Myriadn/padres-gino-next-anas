'use client'

import { toggleFavoriteAction } from '@/app/actions'
import { use, useOptimistic, useState, useTransition } from 'react'

export default function FavoriteButton({
  pizzaId,
  pizzaName,
  favoriteIdsPromise,
}: {
  pizzaId: string
  pizzaName: string
  favoriteIdsPromise: Promise<string[]>
}) {
  // const favoriteIds = use(favoriteIdsPromise)
  // const [isFavorite, setIsFavorite] = useState(favoriteIds.includes(pizzaId))
  const isFavorite = use(favoriteIdsPromise).includes(pizzaId)
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleClick() {
    setError(null)
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite)
      const result = await toggleFavoriteAction(pizzaId)

      if (!result.ok) setError(result.error)
    })
  }

  // async function toggle() {
  //   setError(null)
  //   const res = await fetch(`/api/favorites/${pizzaId}`, { method: 'POST' })
  //   if (!res.ok) {
  //     setError('Gagal menyimpan favorit. Coba lagi.')
  //     return
  //   }
  //   const body = (await res.json()) as { isFavorite: boolean }
  //   setIsFavorite(body.isFavorite)
  //   window.dispatchEvent(new Event('favorites-changed'))
  // }

  return (
    <div className="flex shrink-0 flex-col items-end">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={optimisticFavorite}
        aria-busy={isPending}
        aria-label={`${optimisticFavorite ? 'Hapus' : 'Tambah'} ${pizzaName} ${optimisticFavorite ? 'dari' : 'ke'} favorit`}
        className={`text-2xl leading-none text-brand transition-opacity ${isPending ? 'opacity-50' : ''} `}
      >
        {optimisticFavorite ? '♥' : '♡'}
      </button>
      {error && (
        <p
          role="alert"
          className="mt-1 max-w-32 text-right text-xs text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  )
}
