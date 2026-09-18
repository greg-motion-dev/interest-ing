"use client";

import CalculatorLayout from "@/components/CalculatorLayout";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-between py-4 sm:py-8 md:py-12 sm:items-start">
        <CalculatorLayout />
      </main>
    </div>
  );
}
