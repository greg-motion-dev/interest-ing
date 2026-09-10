import useSWR from "swr";
import ScenarioCard from "./ScenarioCard";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ScenarioList() {
  const { data, isLoading } = useSWR("/api/scenarios", fetcher);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (!data) {
    return;
  }

  const scenarios = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario._id} scenario={scenario} />
      ))}
    </div>
  );
}
