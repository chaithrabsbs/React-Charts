import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
  const [data, setData] = useState(null);
  var baseUrl = "https://www.carboninterface.com/api/v1/vehicle_makes";
  var apiKey = "Bearer kIcSmE5I0hdwTn6bS9PmA";
  //var proxyUrl = "https://cors-anywhere.herokuapp.com";
  //var postapi = "http://localhost/index.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${apiKey}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        const json = await response.json();
        const limitedData = json.slice(0, 8); // Limiting the data to 8 items
        console.log("limiteddata", limitedData);
        setData(limitedData);

        // POST API call to save limitedData
        const postData = async () => {
          try {
            const postResponse = await fetch("http://localhost/index.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify(limitedData),
            });
            const postJson = await postResponse.json();
            console.log("Post API response:", postJson);
          } catch (error) {
            console.error("Error in POST API call:", error);
          }
        };

        postData();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [baseUrl, apiKey]);

  console.log("data", data);

  var chartdata = {
    labels: data?.map((x) => x.data.attributes.name),
    datasets: [
      {
        label: `${data?.length} `,
        data: data?.map((x) => x.data.attributes.number_of_models),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: "true",
          text: "Vehicle Make",
          color: "rgba(54,162,235,1)",
        },
      },
      y: {
        title: {
          display: "true",
          text: "No of Vehicles",
          color: "rgba(54,162,235,1)",
        },
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Bar data={chartdata} height={400} options={options} />
    </div>
  );
};

export default BarChart;
