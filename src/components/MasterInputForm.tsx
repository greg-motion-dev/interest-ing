import RangeSlider from "./RangeSlider";
import ScenarioSaveButton from "./ScenarioSaveButton";
import type { SliderConfig, CalculatorType } from "@/types/calculator";

interface MasterInputFormProps {
  sliders: SliderConfig[];
  type: CalculatorType;
}

export default function MasterInputForm({
  sliders,
  type,
}: MasterInputFormProps) {
  return (
    <div className="flex flex-col space-y-6">
      {sliders.map((slider) => (
        <RangeSlider key={slider.sliderName} {...slider} />
      ))}
      <div className="pt-4 border-border-subtle">
        <ScenarioSaveButton type={type} />
      </div>
    </div>
  );
}
