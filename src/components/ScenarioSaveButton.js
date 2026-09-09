import useCalculatorStore from "@/store/useCalculatorStore";
import saveIcon from "@/assets/save.svg";
import Image from "next/image";
import { mutate } from "swr";

export default function ScenarioSaveButton({ type = "compound-interest" }) {
  const { startCapital, monthlyRate, duration, interestRate } =
    useCalculatorStore();

  async function handleSave() {
    const newScenario = {
      type: type,
      title: "My Custom Scenario", // Ai-Feature soon to be added here
      startCapital: startCapital,
      monthlyRate: monthlyRate,
      duration: duration,
      interestRate: interestRate,
    };

    try {
      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScenario),
      });
      if (response.ok) {
        console.log("Successfully saved!");
        await mutate("/api/scenarios");
      }
    } catch (error) {
      console.error("Failed to save scenario", error);
    }
  }

  return (
    <button
      onClick={handleSave}
      className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-fit"
    >
      <Image src={saveIcon} alt="Save" width={20} height={20} />
      <span className="font-medium text-sm">Save Scenario</span>
    </button>
  );
}
