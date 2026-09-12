import { useSWRConfig } from "swr";
import { useState } from "react";
import deleteIcon from "@/assets/delete.svg";
import editIcon from "@/assets/edit.svg";
import Image from "next/image";
import useCalculatorStore from "@/store/useCalculatorStore";

export default function ScenarioCard({ scenario }) {
  const {
    _id,
    title,
    type,
    startCapital,
    monthlyRate,
    duration,
    interestRate,
  } = scenario;

  const { mutate } = useSWRConfig();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //load scenario
  const { loadScenario, activeScenarioId } = useCalculatorStore();

  // highlight card when currently active
  const isActive = activeScenarioId === _id;

  const metrics = [
    { label: "Start Capital", value: startCapital, unit: "€" },
    { label: "Monthly Rate", value: monthlyRate, unit: "€" },
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
      const response = await fetch(`/api/scenarios/_id`, {
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
      className={`bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:border-[var(--color-primary-500)] ${
        isActive
          ? "border-[var(--color-primary-500)] ring-1 ring-[var(--color-primary-500)]"
          : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
          📈{type}
        </span>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyDown={(e) => e.key === "Enter" && handleUpdateTitle()}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            className="border-b-2 border-gray-800 focus:outline-none text-right font-semibold text-gray-800 w-3/5"
          />
        ) : (
          <h3 className="font-semibold text-gray-800">{title}</h3>
        )}
      </div>

      {errorMessage && (
        <span className="text-xs text-[var(--color-secondary-500)] font-medium">
          {errorMessage}
        </span>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          {metrics.map((metric) => (
            <div key={metric.label}>
              <span className="block text-gray-400 text-xs">
                {metric.label}
              </span>
              <span className="font-medium text-gray-800">
                {metric.value} {metric.unit}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-end">
          {showConfirm ? (
            <div
              className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs bg-[var(--color-secondary-500)] text-white px-2 py-1 rounded hover:bg-[var(--color-secondary-500)] transition-colors font-medium"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                type="button"
                aria-label="edit"
              >
                <Image src={editIcon} alt="edit" width={20} height={20} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(true);
                }}
                type="button"
                aria-label="delete"
              >
                <Image src={deleteIcon} alt="Delete" width={20} height={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
