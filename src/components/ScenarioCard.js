import { useSWRConfig } from "swr";
import { useState } from "react";
import deleteIcon from "@/assets/delete.svg";
import editIcon from "@/assets/edit.svg";
import Image from "next/image";

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
        console.log("Successfully deleted!");
        await mutate("/api/scenarios");
      }
    } catch (error) {
      console.error("Failed to delete scenario", error);
    }
  }

  async function handleUpdateTitle() {
    if (newTitle.trim() === title || newTitle.trim() === "") {
      setIsEditing(false);
      setNewTitle(title);
      return;
    }

    try {
      const response = await fetch(`/api/scenarios/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });

      if (response.ok) {
        console.log("Successfully updated!");
        await mutate("/api/scenarios");
        setIsEditing(false);
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating title:", error);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
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
            autoFocus
            className="border-b-2 border-gray-800 focus:outline-none text-right font-semibold text-gray-800 w-3/5"
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
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
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            <Image src={editIcon} alt="edit" width={25} height={25} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={handleDelete}
            type="button"
          >
            <Image src={deleteIcon} alt="Delete" width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
