import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PiggyBankIcon } from "@/assets/Icons";

export default function ExpandableRateCard({
  label,
  value,
  valueColor,
  valueSize = "text-xl lg:text-2xl tracking-tight",
  finalAmount,
  duration,
  monthlyRate,
  totalInterest,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insight, setInsight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
    setInsight(null);
    setIsError(false);
  }, [finalAmount, duration, monthlyRate, totalInterest]);

  const handleToggle = async () => {
    const nextExpanded = !isExpanded;
    setIsExpanded(nextExpanded);

    if (nextExpanded && !insight && !isLoading) {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch("/api/ai/actionplan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            finalAmount,
            duration,
            monthlyRate,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch AI insights");

        const data = await response.json();
        setInsight(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isDisabled = !finalAmount || finalAmount <= 0;
  const isActiveOrLoading = isExpanded || isLoading;
  const roundedRate = Math.round(monthlyRate || 0);

  return (
    <div className="bg-surface border border-border-subtle p-4 sm:p-6 rounded-2xl flex flex-col relative overflow-hidden transition-colors hover:border-border">
      <div className="flex justify-between items-end z-10">
        <div>
          <p className="text-text-muted text-xs font-medium mb-1">{label}</p>
          <p className={`${valueSize} font-bold ${valueColor}`}>{value}</p>
        </div>

        <button
          onClick={handleToggle}
          disabled={isDisabled || isLoading}
          className={`p-1 transition-colors duration-200 bg-transparent border-none cursor-pointer ${
            isActiveOrLoading
              ? "text-secondary"
              : "text-text-muted hover:text-foreground"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={`How to save ${roundedRate} per month`}
        >
          <PiggyBankIcon
            className={`w-[22px] h-[22px] flex flex-end fill-current ${isLoading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-5 border-t border-border-subtle flex flex-col gap-4">
              {isLoading && (
                <div className="flex flex-col gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-surface-elevated animate-pulse rounded-none"
                    />
                  ))}
                </div>
              )}

              {isError && (
                <div className="border-l-2 border-red-500 pl-3">
                  <p className="text-secondary text-xs">
                    Failed to load plan. Try again.
                  </p>
                </div>
              )}

              {insight && (
                <>
                  <div className="w-full bg-primary/10 border border-primary/30 px-4 py-2.5 text-xs font-semibold text-primary flex items-center justify-center rounded-xl text-center">
                    That's ~{Math.round(insight.weeklyTarget)} € per week
                  </div>

                  <div className="flex flex-col gap-3">
                    {insight.hacks.map((hack, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="text-base leading-none mt-0.5">
                          {hack.icon}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-foreground mb-0.5">
                            {hack.title}
                          </span>
                          <span className="text-[11px] text-text-muted leading-tight">
                            {hack.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
