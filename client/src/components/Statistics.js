import StatBox from "./StatBox";

function Statistics(props) {
  const stats = [
    { name: "1 day products", main: 57319, change: -2381 },
    { name: "Total products", main: 156098, change: 3298 },
    { name: "Average price", main: 20.34, change: 1.02 },
  ];

  return (
    <div style={{ display: "flex" }} className="Statistics">
      {stats.map((statistic, i) => (
        <StatBox
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
