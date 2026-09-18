import useCalculatorStore from "@/store/useCalculatorStore";
import { SaveIcon, UpdateIcon } from "@/assets/Icons";
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

    const initialScenario = {
      type: type,
      title: "Generating title...",
      ...getPayload(),
    };

    let createdScenarioId = null;

    try {
      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialScenario),
      });
      if (response.ok) {
        const savedData = await response.json();
        createdScenarioId = savedData._id;

        setStatusMessage("Saved new scenario!");
        await mutate("/api/scenarios");
        clearActiveScenario();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage("Saving failed!");
        return;
      }
    } catch (error) {
      setStatusMessage("Network error");
      return;
    }
    if (!createdScenarioId) return;

    try {
      const aiResponse = await fetch("/api/ai/naming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getPayload()),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();

        if (aiData.title) {
          const patchResponse = await fetch(
            `/api/scenarios/${createdScenarioId}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title: aiData.title }),
            },
          );

          if (patchResponse.ok) {
            await mutate("/api/scenarios");
          }
        }
      }
    } catch (error) {
      console.error(
        "Background AI Naming failed, keeping fallback title",
        error,
      );
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
            <UpdateIcon className="w-5 h-5" />
            <span className="font-medium text-sm">Update Current</span>
          </button>

          <button
            onClick={handleSaveNew}
            className="flex items-center justify-center gap-2 bg-surface-elevated text-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity w-fit border border-border-subtle"
          >
            <SaveIcon className="w-5 h-5" />
            <span className="font-medium text-sm">Save as new</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleSaveNew}
          className="flex items-center justify-center gap-2 bg-surface-elevated text-foreground px-4 py-2 rounded-lg hover:opacity-80 transition-opacity w-fit border border-border-subtle"
        >
          <SaveIcon className="w-5 h-5" />
          <span className="font-medium text-sm">Save Scenario</span>
        </button>
      )}

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
