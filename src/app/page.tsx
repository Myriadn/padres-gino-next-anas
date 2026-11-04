import MenuExplorer from '@/components/MenuExplorer'
import { getFavoriteIds, getPizzas } from '@/lib/data'

export default async function MenuPage() {
  const [pizzas, favoriteIds] = await Promise.all([
    getPizzas(),
    getFavoriteIds(),
  ])

  return (
    <section>
      <h1 className="mb-6 text-3xl font-black">Menu</h1>
      <MenuExplorer pizzas={pizzas} initialFavoriteIds={favoriteIds} />
    </section>
  )
}
