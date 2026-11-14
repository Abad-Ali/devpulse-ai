import {
  Activity,
  Clock3,
  Gauge,
  Wallet,
} from "lucide-react";

const UsageSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Usage & Limits
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your DevPulse AI usage and limits.
        </p>
      </div>

      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/10 px-6 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-muted">
          <Gauge className="size-6 text-orange-500" />
        </div>

        <span className="mt-5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          Coming Soon
        </span>

        <h3 className="mt-3 text-base font-semibold text-foreground">
          Usage analytics are on the way
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Soon you will be able to monitor API usage, execution
          limits, and remaining requests from one place.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Activity className="size-3.5" />
            Usage tracking
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            Request history
          </span>

          <span className="flex items-center gap-1.5">
            <Wallet className="size-3.5" />
            Usage limits
          </span>
        </div>
      </div>
    </div>
  );
};

export default UsageSettings;