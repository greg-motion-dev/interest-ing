"use client";
import { TestComponent } from "./TestComponent";
import Image from "next/image";
import CalculatorLayout from "@/components/CalculatorLayout";
import PageCompound from "@/components/PageCompound";
import ScenarioList from "@/components/ScenarioList";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex-1 w-full max-w-7xl mx-auto flex-col items-center justify-between py-12 px-4 md:px-8 sm:items-start">
        {/* <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        /> */}

        <CalculatorLayout />
        {/* <TestComponent /> */}
      </main>
    </div>
  );
}
