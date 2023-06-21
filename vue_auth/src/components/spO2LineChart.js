
export const spO2 = {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "SpO2",
          data: [],
          backgroundColor: "rgba(24,73,93,.5)",
          borderColor: "#26495d",
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
  
  export default spO2;