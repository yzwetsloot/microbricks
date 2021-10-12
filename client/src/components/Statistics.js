import { useState, useEffect } from "react";

import StatBox from "./StatBox";

function Statistics(props) {
  const [statistics, setStatistics] = useState([
    { name: "1 day products", main: 0, change: 0 },
    { name: "Total products", main: 0, change: 0 },
    { name: "Average price", main: 0, change: 0 },
  ]);

  const [loading, setLoading] = useState(false);

  const getStatistics = () => {
    setLoading(true);

    fetch("/p/getStatistics")
      .then((response) => response.json())
      .then((body) => {
        setStatistics(body);
        console.info(`Received ${body.length} statistics`);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to retrieve statistics: ${err.stack}`);
        setLoading(false);
      });
  };

  // componentDidMount
  useEffect(getStatistics, []);

  return (
    <div style={{ display: "flex" }} className="Statistics">
      {statistics.map((statistic, i) => (
        <StatBox
          loading={loading}
          name={statistic.name}
          main={statistic.main}
          change={statistic.change}
          key={i}
        />
      ))}
    </div>
  );
}

export default Statistics;
