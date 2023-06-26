
export const fc = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "FC",
        data: [],
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
      xAxes: [
        {
          ticks: {
            maxTicksLimit: 10, // Limit the number of x-axis ticks to 10
            padding: 10
          }
        }
      ],
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