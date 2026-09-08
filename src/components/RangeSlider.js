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
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor={sliderName}>{label}</label>
          <div className="relative flex items-center">
            <input
              className="w-24 px-2 py-1 text-right bg-zinc-800 text-white rounded border border-zinc-700 text-sm"
              type="number"
              min={min}
              max={max}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
            />
            <span className="absolute right-3 text-zinc-400 text-sm pointer-events-none">
              {unit}
            </span>
          </div>
        </div>
        <input
          type="range"
          name={sliderName}
          id={sliderId}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </>
  );
}
