import RangeSlider from "./RangeSlider";
import ScenarioSaveButton from "./ScenarioSaveButton";

export default function MasterInputForm({ sliders, type }) {
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
