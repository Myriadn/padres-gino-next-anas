'use server'

import { refresh } from 'next/cache'
import { addRating, pizzaExists, toggleFavorite } from '@/lib/data'
import { shouldFail, simulateLatency } from '@/lib/demo'
import { parseStars } from '@/lib/format'

export type ActionResult = { ok: true } | { ok: false; error: string }

// Anyone can POST to a Server Action, so treat every argument as untrusted input
export async function toggleFavoriteAction(
  pizzaId: string,
): Promise<ActionResult> {
  if (typeof pizzaId !== 'string' || !(await pizzaExists(pizzaId))) {
    return { ok: false, error: 'Unknown Pizza.' }
  }

  await simulateLatency('write')
  if (await shouldFail()) {
    return { ok: false, error: 'Failed to save favorite pizza. Try again.' }
  }

  await toggleFavorite(pizzaId)
  // Re-render the current page on the server: hearts and header update together
  refresh()
  return { ok: true }
}

export async function ratePizzaAction(
  pizzaId: string,
  formData: FormData,
): Promise<ActionResult> {
  const stars = parseStars(formData.get('stars'))

  if (stars === null) {
    return { ok: false, error: 'The Rating should be around 1 to 5' }
  }

  if (!(await pizzaExists(pizzaId))) {
    return { ok: false, error: 'Unknown pizza' }
  }

  await simulateLatency('write')

  if (await shouldFail()) {
    return { ok: false, error: 'Failed to sav rating. try again' }
  }

  await addRating(pizzaId, stars)
  refresh()

  return { ok: true }
}
