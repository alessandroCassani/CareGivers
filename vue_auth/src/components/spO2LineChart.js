
export const spO2 = {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "SpO2",
          data: [],
          backgroundColor: "rgba(544,303,93,.5)",
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
              padding: 10,

            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: false,  
              padding: 25,
              precision: 0,
              min:60,
              max:100
            }
          }
        ]
      }
    }
  };
  
  export default spO2;