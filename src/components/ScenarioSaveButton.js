import useCalculatorStore from "@/store/useCalculatorStore";
import { SaveIcon } from "@/assets/Icons";
import { mutate } from "swr";
import { useState } from "react";

export default function ScenarioSaveButton({ type = "compound-interest" }) {
  const {
    startCapital,
    monthlyRate,
    duration,
    interestRate,
    targetAmount,
    activeScenarioId,
    clearActiveScenario,
  } = useCalculatorStore();

  const [statusMessage, setStatusMessage] = useState(null);

  const getPayload = () => {
    const baseData = {
      type,
      startCapital,
      duration,
      interestRate,
    };

    if (type === "compound-interest") {
      return { ...baseData, monthlyRate };
    } else {
      return { ...baseData, targetAmount };
    }
  };

  async function handleSaveNew() {
    setStatusMessage(null);
    const newScenario = {
      type: type,
      title: "My Custom Scenario", // Ai-Feature soon to be added here
      ...getPayload(),
    };

    try {
      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScenario),
      });
      if (response.ok) {
        setStatusMessage("Saved new scenario!");
        await mutate("/api/scenarios");
        clearActiveScenario();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage("Saving failed!");
      }
    } catch (error) {
      setStatusMessage("Network error");
    }
  }

  async function handleUpdateCurrent() {
    if (!activeScenarioId) return;
    setStatusMessage(null);

    const updatedData = getPayload();

    try {
      const response = await fetch(`/api/scenarios/${activeScenarioId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        setStatusMessage("Scenario updated!");
        await mutate("/api/scenarios");
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage("Update failed!");
      }
    } catch (error) {
      setStatusMessage("Network error");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 mt-4">
      {activeScenarioId ? (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleUpdateCurrent}
            className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity w-fit"
          >
            <SaveIcon className="w-5 h-5" />
            <span className="font-medium text-sm">Update Current</span>
          </button>

          <button
            onClick={handleSaveNew}
            className="flex items-center justify-center gap-2 bg-surface-elevated text-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity w-fit border border-border-subtle"
          >
            <span className="font-medium text-sm">Save as New</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleSaveNew}
          className="flex items-center justify-center gap-2 bg-surface-elevated text-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity w-fit border border-border-subtle"
        >
          <SaveIcon className="w-5 h-5" />{" "}
          <span className="font-medium text-sm">Save Scenario</span>
        </button>
      )}

      {/* Clean UI feedback replacing console.log */}
      {statusMessage && (
        <span
          className={`text-xs font-medium mt-1 ${
            statusMessage.includes("Failed") || statusMessage.includes("error")
              ? "text-secondary"
              : "text-primary"
          }`}
        >
          {statusMessage}
        </span>
      )}
    </div>
  );
}
