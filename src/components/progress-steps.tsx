import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  steps: string[]
  currentIndex: number
}

export const ProgressSteps = ({ steps, currentIndex }: ProgressStepsProps) => {
  const percent = ((currentIndex + 1) / steps.length) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.32em] text-[#805239]">
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span>{Math.round(percent)}% complete</span>
      </div>
      <div className="relative overflow-hidden rounded-full border border-[#caa06e]/60 bg-[rgba(255,243,225,0.88)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div aria-hidden className="striped-overlay pointer-events-none absolute inset-0 opacity-35" />
        <Progress
          value={percent}
          className="h-2 rounded-full [&>div]:rounded-full [&>div]:bg-[#432215]"
        />
      </div>
      <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6d4630]">
        {steps.map((label, idx) => (
          <span
            key={label}
            className={cn(
              "rounded-full border px-3 py-1",
              idx === currentIndex
                ? "border-[#432015] bg-[#432015] text-[#fff4df] shadow-[0_10px_22px_rgba(67,32,21,0.28)]"
                : idx < currentIndex
                  ? "border-[#8f6040]/70 bg-[#f6d9b1]/85 text-[#603a27]"
                  : "border-[#d9b58b]/70 bg-[#fffaf1]/88",
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
