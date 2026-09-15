import { useState } from "react";

export default function RangeSlider({
  label,
  min,
  max,
  onChange,
  sliderId,
  sliderName,
  step = 1,
  unit = "",
  value,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [prevPropValue, setPrevPropValue] = useState(value);

  if (value !== prevPropValue) {
    setPrevPropValue(value);
    setInputValue(value);
  }

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (val !== "") {
      onChange(Number(val));
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
    let finalValue = Number(inputValue);

    if (inputValue === "" || isNaN(finalValue) || finalValue < min) {
      finalValue = min;
    } else if (finalValue > max) {
      finalValue = max;
    }

    setInputValue(finalValue);
    onChange(finalValue);
  };

  const paddingClass = isFocused ? "pr-3" : unit.length > 1 ? "pr-12" : "pr-7";
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={sliderName} className="text-foreground font-medium">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-28 px-3 py-1.5 text-right bg-surface text-foreground rounded-lg border border-border-subtle text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${paddingClass}`}
          />
          {!isFocused && unit && (
            <span className="absolute right-2.5 text-text-muted text-sm pointer-events-none">
              {unit}
            </span>
          )}
        </div>
      </div>
      <input
        className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
        type="range"
        name={sliderName}
        id={sliderId || sliderName}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
