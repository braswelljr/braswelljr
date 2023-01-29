import { KBarResults, useMatches } from 'kbar'
import CommandResultItem from '@/components/CommandResultItem'

export default function RenderResults() {
  const { results, rootActionId } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === 'string') {
          return <div className="px-5 py-2.5 text-sm uppercase dark:text-neutral-400">{item}</div>
        }

        return (
          <CommandResultItem action={item} active={active} currentRootActionId={rootActionId} />
        )
      }}
    />
  )
}
