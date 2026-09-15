import useCalculatorStore from "@/store/useCalculatorStore";
import PageCompound from "./PageCompound";
import PageSavingsPlan from "./PageSavingsPlan";
import { PercentIcon, PiggyBankIcon } from "@/assets/Icons";

export default function CalculatorLayout() {
  const { activeCalculator, setActiveCalculator } = useCalculatorStore();

  const isCompoundActive = activeCalculator === "compound-interest";
  const isSavingsActive = activeCalculator === "savings-plan";

  return (
    <div className="bg-background text-foreground p-4 md:p-8 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap8">
        <section className="w-full h-fit">
          <div className="bg-surface/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-border-subtle">
            {/*  Navigation Bar */}
            <nav className="max-w-7xl mx-auto mb-2 flex justify-center">
              <div className="flex space-x-2 bg-surface-elevated/50 p-1 rounded-full backdrop-blur-md shadow-sm border border-border-subtle">
                <button
                  onClick={() => setActiveCalculator("compound-interest")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    isCompoundActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-primary/10 text-primary border-primary hover:bg-primary/20"
                  }`}
                  type="button"
                >
                  <PercentIcon
                    className={`w-5 h-5 ${isCompoundActive ? "text-white" : "text-primary"}`}
                  />
                  Compound Interest
                </button>

                <button
                  onClick={() => setActiveCalculator("savings-plan")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    isSavingsActive
                      ? "bg-secondary text-white border-secondary shadow-sm"
                      : "bg-secondary/10 text-secondary border-secondary hover:bg-secondary/20"
                  }`}
                  type="button"
                >
                  <PiggyBankIcon
                    className={`w-5 h-5 ${isSavingsActive ? "text-white" : "text-secondary"}`}
                  />
                  Savings Goal
                </button>
              </div>
            </nav>

            {/* Conditional view rendering driven by Zustand */}
            {activeCalculator === "compound-interest" ? (
              <PageCompound />
            ) : (
              <PageSavingsPlan />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
