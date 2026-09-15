import { useSWRConfig } from "swr";
import { useState } from "react";
import useCalculatorStore from "@/store/useCalculatorStore";
import {
  EditIcon,
  DeleteIcon,
  PiggyBankIcon,
  PercentIcon,
} from "@/assets/Icons";

export default function ScenarioCard({ scenario }) {
  const {
    _id,
    title,
    type,
    startCapital,
    monthlyRate,
    targetAmount,
    duration,
    interestRate,
  } = scenario;

  const { mutate } = useSWRConfig();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //load scenario
  const { loadScenario, activeScenarioId, clearActiveScenario } =
    useCalculatorStore();

  // highlight card when currently active
  const isActive = activeScenarioId === _id;

  const metrics = [
    { label: "Start Capital", value: startCapital, unit: "€" },
    type === "savings-plan"
      ? { label: "Target Amount", value: targetAmount, unit: "€" }
      : { label: "Monthly Rate", value: monthlyRate, unit: "€" },
    { label: "Duration", value: duration, unit: "Years" },
    { label: "Interest Rate", value: interestRate, unit: "%" },
  ];

  async function handleDelete() {
    try {
      const response = await fetch(`/api/scenarios/${scenario._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await mutate("/api/scenarios");
        if (activeScenarioId === _id) {
          clearActiveScenario();
        }
      } else {
        setErrorMessage("Delete failed!");
        setShowConfirm(false);
      }
    } catch (error) {
      setErrorMessage("Network error!");
      setShowConfirm(false);
    }
  }

  async function handleUpdateTitle() {
    if (newTitle.trim() === title || newTitle.trim() === "") {
      setIsEditing(false);
      setNewTitle(title);
      return;
    }

    setErrorMessage(null);
    try {
      const response = await fetch(`/api/scenarios/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });

      if (response.ok) {
        await mutate("/api/scenarios");
        setIsEditing(false);
      } else {
        setErrorMessage("Update failed.");
        setNewTitle(title);
      }
    } catch (error) {
      setErrorMessage("Network Error");
      setNewTitle(title);
    }
  }

  return (
    <div
      onClick={() => loadScenario(scenario)}
      className={`bg-surface border rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:border-primary ${
        isActive ? "border-primary ring-1 ring-primary" : "border-border-subtle"
      }`}
    >
      <div className="flex flex-col space-y-1">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyDown={(e) => e.key === "Enter" && handleUpdateTitle()}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            className="border-b-2 border-foreground bg-transparent focus:outline-none font-semibold text-foreground text-lg w-full"
          />
        ) : (
          <h3 className="font-semibold text-foreground text-lg tracking-tight">
            {title}
          </h3>
        )}
      </div>

      {errorMessage && (
        <span className="text-xs text-secondary font-medium">
          {errorMessage}
        </span>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-text-muted">
        <div className="grid grid-cols-2 gap-2 col-span-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-2.5 rounded-lg bg-surface-elevated"
            >
              <span className="block text-text-muted text-xs">
                {metric.label}
              </span>
              <span className="font-medium text-foreground">
                {metric.value} {metric.unit}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between col-span-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-surface-elevated text-text-muted rounded-full font-medium">
            {type === "savings-plan" ? (
              <PiggyBankIcon className="w-5 h-5 text-secondary" />
            ) : (
              <PercentIcon className="w-5 h-5 text-primary" />
            )}
            <span className="capitalize">{type.replace("-", " ")}</span>
          </div>

          {showConfirm ? (
            <div
              className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border-subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs bg-secondary text-white px-2 py-1 rounded hover:opacity-90 transition-opacity font-medium"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="text-xs bg-surface-elevated text-foreground px-2 py-1 rounded hover:opacity-80 transition-opacity font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                className="p-2 hover:bg-surface-elevated rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                type="button"
                aria-label="edit"
              >
                <EditIcon className="w-5 h-5 text-text-muted hover:text-foreground transition-colors" />
              </button>
              <button
                className="p-2 hover:bg-surface-elevated rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true);
                }}
                type="button"
                aria-label="delete"
              >
                <DeleteIcon className="w-5 h-5 text-text-muted hover:text-foreground transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
