import useCalculatorStore from "@/store/useCalculatorStore";
import { SaveIcon, UpdateIcon } from "@/assets/Icons";
import { mutate } from "swr";
import { useState } from "react";
import type { CalculatorType, SavedScenario } from "@/types/calculator";

interface ScenarioSaveButtonProps {
  type: CalculatorType;
}

export default function ScenarioSaveButton({ type }: ScenarioSaveButtonProps) {
  const {
    startCapital,
    monthlyRate,
    duration,
    interestRate,
    targetAmount,
    activeScenarioId,
    loadScenario,
  } = useCalculatorStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isUpdating = Boolean(activeScenarioId);

  async function handleSave() {
    setIsLoading(true);
    setErrorMessage(null);

    const payload = {
      type,
      startCapital,
      monthlyRate,
      duration,
      interestRate,
      targetAmount,
    };

    try {
      const url = isUpdating
        ? `/api/scenarios/${activeScenarioId}`
        : "/api/scenarios";
      const method = isUpdating ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedScenario: SavedScenario = await response.json();
        await mutate("/api/scenarios");

        if (!isUpdating) {
          loadScenario(savedScenario);
        }
      } else {
        setErrorMessage("Saving failed.");
      }
    } catch {
      setErrorMessage("Network error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={handleSave}
        disabled={isLoading}
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
      >
        {isUpdating ? (
          <>
            <UpdateIcon className="w-5 h-5" />
            Update Scenario
          </>
        ) : (
          <>
            <SaveIcon className="w-5 h-5" />
            Save Scenario
          </>
        )}
      </button>
      {errorMessage && (
        <span className="text-xs text-secondary text-center font-medium">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
