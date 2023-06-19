export const fc = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "FC",
        data: [0, 0, 1, 2, 79, 82, 27, 14],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,  
            padding: 25
          }
        }
      ]
    }
  }
};

export default fc;