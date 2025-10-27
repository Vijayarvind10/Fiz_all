import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  steps: string[]
  currentIndex: number
}

export const ProgressSteps = ({ steps, currentIndex }: ProgressStepsProps) => {
  const percent = ((currentIndex + 1) / steps.length) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span>{Math.round(percent)}% complete</span>
      </div>
      <Progress value={percent} className="h-2 rounded-full bg-slate-200" />
      <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
        {steps.map((label, idx) => (
          <span
            key={label}
            className={cn(
              "rounded-full border px-2 py-1",
              idx === currentIndex
                ? "border-slate-900 bg-slate-900 text-white"
                : idx < currentIndex
                  ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                  : "border-slate-200 bg-white",
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
