import useCalculatorStore from "@/store/useCalculatorStore";
import RangeSlider from "./RangeSlider";

export default function MasterInputForm() {
  const startCapital = useCalculatorStore((state) => state.startCapital);
  const setStartCapital = useCalculatorStore((state) => state.setStartCapital);

  const monthlyRate = useCalculatorStore((state) => state.monthlyRate);
  const setMonthlyRate = useCalculatorStore((state) => state.setMonthlyRate);

  const duration = useCalculatorStore((state) => state.duration);
  const setDuration = useCalculatorStore((state) => state.setDuration);

  const interestRate = useCalculatorStore((state) => state.interestRate);
  const setInterestRate = useCalculatorStore((state) => state.setInterestRate);

  return (
    <div className="flex flex-col space-y-6">
      <RangeSlider
        label="Start Capital"
        min={0}
        max={50000}
        onChange={setStartCapital}
        sliderName="startCapital"
        unit="€"
        value={startCapital}
      />
      <RangeSlider
        label="Monthly Rate"
        min={0}
        max={10000}
        onChange={setMonthlyRate}
        sliderName="monthlyRate"
        unit="€"
        value={monthlyRate}
      />
      <RangeSlider
        label="Duration"
        min={0}
        max={100}
        onChange={setDuration}
        sliderName="duration"
        unit="Years"
        value={duration}
      />
      <RangeSlider
        label="Interest Rate"
        min={0}
        max={15}
        onChange={setInterestRate}
        sliderName="interestRate"
        unit="%"
        value={interestRate}
      />
    </div>
  );
}
