import PageCompound from "./PageCompound";
import ScenarioSaveButton from "./ScenarioSaveButton";

export default function CalculatorLayout() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      {/* remember to add top navigation later here */}
      <nav className="max-w-7xl mx-auto mb-8 flex justify-center">
        <div className="flex space-x-2 bg-white/50 dark:bg-black/50 p-1 rounded-full backdrop-blur-md shadow-sm border border-white/20 dark:border-white/10">
          {/* toggle buttons placeholder */}
          <button className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm font-medium">
            Compound Interest
          </button>
          <button className="px-4 py-2 rounded-full text-zinc-600 dark:text-zinc-400 font-medium">
            Savings Goal
          </button>
          <button className="px-4 py-2 rounded-full text-zinc-600 dark:text-zinc-400 font-medium">
            Retirement Gap
          </button>
        </div>
      </nav>

      {/* main grid here */}
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <section className="w-full lg:sticky lg:top-8 h-fit">
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40 dark:border-white/10">
            <h2 className="text-xl font-semibold mb-6">financial navigator</h2>
            <ScenarioSaveButton />
            <PageCompound />
          </div>
        </section>
      </main>
    </div>
  );
}
