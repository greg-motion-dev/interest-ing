import { useSWRConfig } from "swr";
import { motion } from "motion/react";
import { useState } from "react";
import useCalculatorStore from "@/store/useCalculatorStore";
import {
  EditIcon,
  DeleteIcon,
  PiggyBankIcon,
  PercentIcon,
  SpinnerIcon,
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
  const {
    loadScenario,
    activeScenarioId,
    clearActiveScenario,
    comparisonScenario,
  } = useCalculatorStore();

  // highlight card when currently active
  const isActive = activeScenarioId === _id;
  const isCompared = comparisonScenario?._id === _id;

  let actionButtonHover =
    "hover:bg-surface-elevated hover:text-foreground text-text-muted";
  let borderClass = "border-border-subtle";
  let bgClass = "bg-surface";
  let badgeClass =
    "bg-surface-elevated/60 text-text-muted border-border-subtle/50";
  let iconColorClass = "text-foreground";
  let innerBgClass = "bg-surface-elevated/50";
  let innerTextMuted = "text-text-muted";
  let innerTextMain = "text-foreground";
  let textAccentClass = "text-foreground";

  if (isCompared) {
    actionButtonHover = "hover:bg-secondary/20 text-secondary";
    badgeClass = "bg-secondary/15 text-secondary border-secondary/30";
    borderClass = "border-transparent";
    bgClass = "bg-secondary/10";
    innerBgClass = "bg-secondary/10";
    iconColorClass = "text-secondary";
    innerTextMuted = "text-secondary/70";
    innerTextMain = "text-secondary";
    textAccentClass = "text-secondary";
  } else if (isActive) {
    actionButtonHover = "hover:bg-primary/20 text-primary";
    badgeClass = "bg-primary/15 text-primary border-primary/30";
    borderClass = "border-solid border-primary ring-1 ring-primary";
    bgClass = "bg-primary/10";
    innerBgClass = "bg-primary/10";
    iconColorClass = "text-primary";
    innerTextMuted = "text-primary/70";
    innerTextMain = "text-primary";
    textAccentClass = "text-primary";
  }

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
    <motion.div
      onClick={() => loadScenario(scenario)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden ${bgClass} border ${borderClass} rounded-2xl p-5 flex flex-col justify-between space-y-4 cursor-pointer`}
    >
      {isCompared && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            width="100%"
            height="100%"
            rx="16"
            fill="none"
            strokeWidth="4"
            strokeDasharray="5 5"
            initial={{ strokeDashoffset: 16 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="stroke-secondary opacity-80"
          />
        </svg>
      )}
      <div className="relative z-10 flex flex-col space-y-1">
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
        ) : title === "Generating title..." ? (
          <div className="flex items-center gap-2 text-text-muted">
            <SpinnerIcon className="w-5 h-5 animate-spin text-primary" />
            <span className="font-medium text-sm italic">{title}</span>
          </div>
        ) : (
          <h3
            className={`font-semibold ${textAccentClass} text-lg tracking-tight`}
          >
            {title}
          </h3>
        )}
      </div>

      {errorMessage && (
        <span className="text-xs text-secondary font-medium">
          {errorMessage}
        </span>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="grid grid-cols-2 gap-2 col-span-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`p-3 rounded-xl ${innerBgClass} border border-border-subtle/40 backdrop-blur-sm`}
            >
              <span className={`block ${innerTextMuted} text-xs font-medium`}>
                {metric.label}
              </span>
              <span
                className={`font-semibold ${innerTextMain} text-sm mt-0.5 block`}
              >
                {metric.value} {metric.unit}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between col-span-2 pt-2">
          <div
            className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${badgeClass}`}
          >
            {type === "savings-plan" ? (
              <PiggyBankIcon className={`w-4 h-4 ${iconColorClass}`} />
            ) : (
              <PercentIcon className={`w-4 h-4 ${iconColorClass}`} />
            )}
            <span className="capitalize">{type.replace("-", " ")}</span>
          </div>
          {showConfirm ? (
            <div
              className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-border-subtle"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs bg-secondary text-white px-2.5 py-1 rounded-lg hover:opacity-95 font-medium"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="text-xs bg-surface-elevated text-foreground px-2.5 py-1 rounded-lg hover:opacity-85 font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                className={`p-2 rounded-xl transition-colors ${actionButtonHover}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setNewTitle(title);
                  setIsEditing(true);
                }}
                type="button"
                aria-label="edit"
              >
                <EditIcon className="w-5 h-5 transition-colors" />
              </button>
              <button
                className={`p-2 rounded-xl transition-colors ${actionButtonHover}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true);
                }}
                type="button"
                aria-label="delete"
              >
                <DeleteIcon className="w-5 h-5 transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
