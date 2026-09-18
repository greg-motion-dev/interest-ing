import useCalculatorStore from "@/store/useCalculatorStore";
import PageCompound from "./PageCompound";
import PageSavingsPlan from "./PageSavingsPlan";
import { PercentIcon, PiggyBankIcon } from "@/assets/Icons";
import { motion, AnimatePresence } from "motion/react";

export default function CalculatorLayout() {
  const { activeCalculator, setActiveCalculator } = useCalculatorStore();

  const isCompoundActive = activeCalculator === "compound-interest";
  const isSavingsActive = activeCalculator === "savings-plan";

  return (
    <div className="w-full bg-background text-foreground px-2 py-2 sm:p-4 md:p-8 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-8">
        <section className="w-full h-fit">
          <div className="bg-surface/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-xl border border-border-subtle">
            <nav className="max-w-7xl mx-auto mb-4 md:mb-2 flex justify-center">
              <div className="flex space-x-1 sm:space-x-2 bg-surface-elevated/50 p-1 rounded-full backdrop-blur-md border border-border-subtle">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCalculator("compound-interest")}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors border ${
                    isCompoundActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-transparent text-text-muted border-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  }`}
                  type="button"
                >
                  <PercentIcon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      isCompoundActive
                        ? "text-white"
                        : "text-text-muted group-hover:text-primary"
                    }`}
                  />
                  Compound Interest
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCalculator("savings-plan")}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors border ${
                    isSavingsActive
                      ? "bg-secondary text-white border-secondary shadow-sm"
                      : "bg-transparent text-text-muted border-transparent hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                  }`}
                  type="button"
                >
                  <PiggyBankIcon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      isSavingsActive
                        ? "text-white"
                        : "text-text-muted group-hover:text-secondary"
                    }`}
                  />
                  Savings Goal
                </motion.button>
              </div>
            </nav>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCalculator}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeCalculator === "compound-interest" ? (
                    <PageCompound />
                  ) : (
                    <PageSavingsPlan />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
