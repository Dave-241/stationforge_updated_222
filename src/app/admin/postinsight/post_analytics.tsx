// pages/postAnalytics.js
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  where,
  query,
  Timestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
const PostAnalytics = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [chartData, setChartData] = useState({
    // ... existing data and labels
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "",
        data: [0, 0, 0, 0], // Make sure these are valid numbers
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "",
        borderWidth: 0, // Ensure this is greater than 0
        tension: 0.4, // Smoothness of the line
        pointBackgroundColor: "",
        pointBorderColor: "",
        pointHoverBackgroundColor: "",
        pointBorderWidth: 3, // Increase point border width
        pointHoverBorderWidth: 4,
        pointRadius: 5, // Increase point size
        pointHoverRadius: 7, // Increase point size on hover
        pointHoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  });
  // useEffect(() => {
  //   if (chartRef.current) {
  //     const chart: any = chartRef.current;
  //     const ctx: any = chart.ctx; // Or chart.canvas.getContext('2d') if necessary
  //     const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);

  //     gradient.addColorStop(0.6, "rgba(76, 137, 229, 1)"); // Light blue with opacity
  //     gradient.addColorStop(1, "rgba(204, 255, 0, 0.1)"); // Yellow with opacity
  //     // Update chart data
  //     setChartData({
  //       labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  //       datasets: [
  //         {
  //           label: "",
  //           data: [0, 180, 220, 200], // Make sure these are valid numbers
  //           fill: true,
  //           backgroundColor: "rgba(75,192,192,0.2)",
  //           borderWidth: 5, // Ensure this is greater than 0
  //           tension: 0.4,
  //           borderColor: gradient, // Smoothness of the line
  //           pointBackgroundColor: "white",
  //           pointBorderColor: "black",
  //           pointHoverBackgroundColor: "white",
  //           pointBorderWidth: 3, // Increase point border width
  //           pointHoverBorderWidth: 4,
  //           pointRadius: 5, // Increase point size
  //           pointHoverRadius: 7, // Increase point size on hover
  //           pointHoverBorderColor: "rgba(75,192,192,1)",
  //         },
  //       ],
  //     });
  //   }
  // }, [chartRef]);

  // const fetchPostData = async () => {
  //   const postsCollectionRef = collection(db, "posts"); // Adjust 'posts' to your collection name
  //   const data = await getDocs(postsCollectionRef);

  //   // Process your data here
  //   // Example processing (adjust according to your data structure):
  //   const analyticsData = data.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));

  //   // Extract labels and data for the chart
  //   const labels = analyticsData.map((item: any) => item.label); // Replace 'item.label' with your actual label field
  //   const dataPoints = analyticsData.map((item: any) => item.dataPoint); // Replace 'item.dataPoint' with your actual data field

  //   // setChartData({
  //   //   labels: labels,
  //   //   datasets: [
  //   //     {
  //   //       label: "All posts for this month",
  //   //       data: dataPoints,
  //   //       fill: true,
  //   //       backgroundColor: "rgba(75,192,192,0.2)",
  //   //       borderColor: "rgba(75,192,192,1)",
  //   //       tension: 0.4,
  //   //     },
  //   //   ],
  //   // });
  // };

  //  setChartData((prevChartData) => ({
  //    ...prevChartData,
  //    datasets: [
  //      {
  //        ...prevChartData.datasets[0],
  //        data: dataPoints,
  //      },
  //    ],
  //  }));

  // useEffect(() => {
  //   fetchPostData();
  // }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // You can set this to false to control the aspect ratio via CSS
    scales: {
      y: {
        border: { dash: [20, 8] }, // for the grid lines
        grid: {
          color: "#aaa", // for the grid lines
          tickColor: "#aaa", // for the tick mark
          tickBorderDash: [5, 4], // also for the tick, if long enough
          tickLength: 20, // just to see the dotted line
          tickWidth: 2,
          lineWidth: 2,
          offset: true,
          drawTicks: true, // true is default
          drawOnChartArea: true, // true is default
        },

        beginAtZero: true,
      },
      x: {
        border: { dash: [20, 8] }, // for the grid lines
        grid: {
          color: "#aaa", // for the grid lines
          tickColor: "#aaa", // for the tick mark
          tickBorderDash: [5, 4], // also for the tick, if long enough
          tickLength: 20, // just to see the dotted line
          tickWidth: 2,
          lineWidth: 2,
          offset: true,
          drawTicks: true, // true is default
          drawOnChartArea: true, // true is default
        },

        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // This will show the legend
      },
      title: {
        display: false,
        text: "Post Analytics", // Title of the chart
      },
    },
    elements: {
      point: {
        radius: 4, // Size of the point
        borderWidth: 2, // Border width of the point
        hoverRadius: 6, // Size of the point when hovered
        hoverBorderWidth: 3, // Border width when hovered
      },
      line: {
        borderWidth: 3, // Thickness of the line
      },
    },
  };

  return (
    <div className=" px-[2vw] ">
      <div className="bg-white w-full rounded-[2vw] px-[3vw]  h-[40vw] flex flex-col gap-[1vw] py-[3vw] mb-[4vw]">
        <h2 className="neuem text-[3vw] font-[800]  ">Post Analytics</h2>

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          {/* Add more years as needed */}
        </select>

        {/* Month Dropdown */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="01">January</option>
          <option value="02">February</option>
          {/* Add more months as needed */}
        </select>
        <div className="w-full h-[35vw]">
          <Line data={chartData} ref={chartRef} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PostAnalytics;
