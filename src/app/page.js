"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { TestComponent } from "./TestComponent";
import CalculatorLayout from "@/components/CalculatorLayout";
import PageCompound from "@/components/PageCompound";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-red font-sans">
      <main className="flex-1 w-full max-w-7xl mx-auto flex-col items-center justify-between py-12 px-4 md:px-8 bg-white dark:bg-black sm:items-start">
        {/* <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        /> */}
        <PageCompound />
        {/* <CalculatorLayout /> */}
        {/* <TestComponent /> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-50 h-50 bg-[var(--color-primary-500)]"
        />
        <motion.div
          className="w-20 h-20 bg-[var(--color-secondary-500)]"
          animate={{
            scale: 2,
            transition: { duration: 2 },
          }}
        />
        <motion.div
          className="w-20 h-20 bg-[var(--color-accent-500)]"
          animate={{
            scale: 2,
            transition: { duration: 2 },
          }}
        />
      </main>
    </div>
  );
}
