import useCalculatorStore from "@/store/useCalculatorStore";
import PageCompound from "./PageCompound";
import PageSavingsPlan from "./PageSavingsPlan";

export default function CalculatorLayout() {
  const { activeCalculator, setActiveCalculator } = useCalculatorStore();

  return (
    <div className="bg-background text-foreground p-4 md:p-8 font-sans transition-colors duration-300">
      {/* Top Navigation Bar */}
      <nav className="max-w-7xl mx-auto mb-8 flex justify-center">
        <div className="flex space-x-2 bg-surface-elevated/50 p-1 rounded-full backdrop-blur-md shadow-sm border border-border-subtle">
          <button
            onClick={() => setActiveCalculator("compound-interest")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCalculator === "compound-interest"
                ? "bg-surface shadow-sm text-foreground"
                : "text-text-muted hover:text-foreground"
            }`}
            type="button"
          >
            Compound Interest
          </button>

          <button
            onClick={() => setActiveCalculator("savings-plan")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCalculator === "savings-plan"
                ? "bg-surface shadow-sm text-foreground"
                : "text-text-muted hover:text-foreground"
            }`}
            type="button"
          >
            Savings Goal
          </button>
        </div>
      </nav>

      {/* Main Dynamic View Area */}
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <section className="w-full h-fit">
          <div className="bg-surface/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-border-subtle">
            <h2 className="text-xl font-semibold mb-6">financial navigator</h2>

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
