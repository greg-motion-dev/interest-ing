import useCalculatorStore from "@/store/useCalculatorStore";
import RangeSlider from "./RangeSlider";
import ScenarioSaveButton from "./ScenarioSaveButton";

export default function MasterInputForm() {
  const { startCapital, monthlyRate, duration, interestRate, updateValue } =
    useCalculatorStore();

  const sliders = [
    {
      label: "Start Capital",
      min: 0,
      max: 50000,
      value: startCapital,
      onChange: (val) => updateValue("startCapital", val),
      sliderName: "startCapital",
      unit: "€",
    },
    {
      label: "Monthly Rate",
      min: 0,
      max: 10000,
      value: monthlyRate,
      onChange: (val) => updateValue("monthlyRate", val),
      sliderName: "monthlyRate",
      unit: "€",
    },
    {
      label: "Duration",
      min: 0,
      max: 100,
      value: duration,
      onChange: (val) => updateValue("duration", val),
      sliderName: "duration",
      unit: "Years",
    },
    {
      label: "Interest Rate",
      min: 0,
      max: 15,
      value: interestRate,
      onChange: (val) => updateValue("interestRate", val),
      sliderName: "interestRate",
      unit: "%",
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {sliders.map((slider) => (
        <RangeSlider key={slider.sliderName} {...slider} />
      ))}
      <div className="pt-4 border-t border-zinc-800">
        <ScenarioSaveButton type="compound-interest" />
      </div>
    </div>
  );
}
