import useSWR from "swr";
import ScenarioCard from "./ScenarioCard";
import useCalculatorStore from "@/store/useCalculatorStore";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ScenarioList() {
  const { activeCalculator } = useCalculatorStore();
  const { data, isLoading } = useSWR("/api/scenarios", fetcher);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (!data) {
    return;
  }

  const scenarios = data.filter(
    (scenario) => scenario.type === activeCalculator,
  );

  if (scenarios.length === 0) {
    return <p className="text-zinc-500 text-sm">No saved scenarios yet</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario._id} scenario={scenario} />
      ))}
    </div>
  );
}
