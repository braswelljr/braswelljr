import { cn } from 'lib/utils'

export default function TerminlIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-5 w-auto', className)}
      data-testid="geist-icon"
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      color="currentColor"
    >
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  )
}
