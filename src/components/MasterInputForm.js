import useCalculatorStore from "@/store/useCalculatorStore";
import RangeSlider from "./RangeSlider";

export default function MasterInputForm() {
  const {
    startCapital,
    setStartCapital,
    monthlyRate,
    setMonthlyRate,
    duration,
    setDuration,
    interestRate,
    setInterestRate,
  } = useCalculatorStore();

  const sliders = [
    {
      label: "Start Capital",
      min: 0,
      max: 50000,
      value: startCapital,
      onChange: setStartCapital,
      sliderName: "startCapital",
      unit: "€",
    },
    {
      label: "Monthly Rate",
      min: 0,
      max: 10000,
      value: monthlyRate,
      onChange: setMonthlyRate,
      sliderName: "monthlyRate",
      unit: "€",
    },
    {
      label: "Duration",
      min: 0,
      max: 100,
      value: duration,
      onChange: setDuration,
      sliderName: "duration",
      unit: "Years",
    },
    {
      label: "Interest Rate",
      min: 0,
      max: 15,
      value: interestRate,
      onChange: setInterestRate,
      sliderName: "interestRate",
      unit: "%",
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {sliders.map((slider) => (
        <RangeSlider key={slider.sliderName} {...slider} />
      ))}
    </div>
  );
}
