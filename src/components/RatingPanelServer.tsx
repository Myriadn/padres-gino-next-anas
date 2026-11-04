import { getRatingSummary } from '@/lib/data'
import RatingPanel from './RatingPanel'

export default async function RatingPanelServer({
  pizzaId,
}: {
  pizzaId: string
}) {
  const summary = await getRatingSummary(pizzaId)

  return <RatingPanel pizzaId={pizzaId} initialSummary={summary} />
}
