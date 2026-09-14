import useCalculatorStore from "@/store/useCalculatorStore";
import PageCompound from "./PageCompound";
import PageSavingsPlan from "./PageSavingsPlan";

export default function CalculatorLayout() {
  const { activeCalculator, setActiveCalculator } = useCalculatorStore();

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      {/* Top Navigation Bar */}
      <nav className="max-w-7xl mx-auto mb-8 flex justify-center">
        <div className="flex space-x-2 bg-white/50 dark:bg-black/50 p-1 rounded-full backdrop-blur-md shadow-sm border border-white/20 dark:border-white/10">
          <button
            onClick={() => setActiveCalculator("compound-interest")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCalculator === "compound-interest"
                ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
            type="button"
          >
            Compound Interest
          </button>

          <button
            onClick={() => setActiveCalculator("savings-plan")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCalculator === "savings-plan"
                ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40 dark:border-white/10">
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
