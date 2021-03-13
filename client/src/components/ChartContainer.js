import Chart from "chart.js";
import React from "react";

function getChartConfig(title, timestamps, values, color) {
  const config = {
    type: "line",
    data: {
      labels: timestamps,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: ["rgba(0, 0, 0, 0)"],
          borderColor: [color],
          borderWidth: 1.8,
          pointRadius: 0,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: title,
        fontColor: "#2b2b2b",
        fontFamily: "'Segoe UI', 'Roboto'",
      },
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        xAxes: [
          {
            offset: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
            gridLines: {
              drawOnChartArea: false,
            },
            type: "time",
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              autoSkip: true,
              beginAtZero: true,
              maxTicksLimit: 7,
            },
          },
        ],
      },
    },
  };

  return config;
}

class ChartContainer extends React.Component {
  componentDidMount() {
    const priceChartContainer = document.getElementById(
      "priceChart_" + this.props.id
    );
    new Chart(
      priceChartContainer,
      getChartConfig(
        "Price",
        this.props.priceHistory.timestamps,
        this.props.priceHistory.values,
        "rgb(0, 0, 255, 1)"
      )
    );

    const quantityChartContainer = document.getElementById(
      "quantityChart_" + this.props.id
    );
    new Chart(
      quantityChartContainer,
      getChartConfig(
        "Quantity",
        this.props.quantityHistory.timestamps,
        this.props.quantityHistory.values,
        "rgb(255, 0, 0, 1)"
      )
    );
  }

  render() {
    return (
      <div className="container">
        <div className="chart-container">
          <canvas id={"priceChart_" + this.props.id}></canvas>
        </div>
        <div className="chart-container">
          <canvas id={"quantityChart_" + this.props.id}></canvas>
        </div>
      </div>
    );
  }
}

export default ChartContainer;
