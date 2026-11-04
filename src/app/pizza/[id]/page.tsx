import PizzaDetail from '@/components/PizzaDetail'
import { getPizza, getPizzas } from '@/lib/data'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const pizzas = await getPizzas()

  return pizzas.map((pizza) => ({
    id: pizza.id,
  }))
}

// The detail UI is a Client Component that reads the id with useParams().
// Cache Components asks us to put runtime data behind a Suspense boundary.
export default async function PizzaDetailPage({ params }: PageProps) {
  const { id } = await params
  const pizza = await getPizza(id)

  if (!pizza) notFound()

  return <PizzaDetail pizza={pizza} />
}
