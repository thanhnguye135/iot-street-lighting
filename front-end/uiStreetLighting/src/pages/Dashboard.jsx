import React, { useEffect } from "react";
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
  Filler,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const Dashboard = () => {
  const [lights, setLights] = React.useState([
    { id: 1, name: "Đèn 1", status: false },
    { id: 2, name: "Đèn 2", status: false },
  ]);
  const [defaultTime, setDefaultTime] = React.useState(10);
  const [sensorData, setSensorData] = React.useState([
    { time: 0, value: 0 },
    { time: 1, value: 1 },
    { time: 2, value: 2 },
    { time: 3, value: 3 },
    { time: 4, value: 4 },
    { time: 5, value: 5 },
    { time: 6, value: 6 },
    { time: 7, value: 7 },
    { time: 8, value: 8 },
    { time: 9, value: 9 },
    { time: 10, value: 10 },
  ]);
  const [timeSeries, setTimeSeries] = React.useState(
    Array.from({ length: defaultTime }, (_, i) => i)
  );

  const toggleLight = (id) => {
    console.log("ID", id);
    setLights((prev) => {
      return prev.map((light) => {
        console.log("Light", light);
        if (id === light.id) {
          return {
            ...light,
            status: !light.status,
          };
        }
        return light;
      });
    });
  };

  const handleDefaultTimeChange = (e) => {
    setDefaultTime(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getSeconds();
      const newSensorData = [
        ...sensorData.slice(1),
        { time: currentTime, value: Math.floor(Math.random() * 100) },
      ];
      setSensorData(newSensorData);

      setTimeSeries((prev) => [
        ...prev.slice(-9),
        { x: currentTime, y: newSensorData[newSensorData.length - 1].value },
      ]);
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const chartData = {
    labels: timeSeries.map((data) => data.x),
    datasets: [
      {
        label: "Sensor Data",
        data: timeSeries.map((data) => data.y),
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue
        borderColor: "rgba(54, 162, 235, 1)", // Dark blue
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Đảm bảo biểu đồ thay đổi kích thước linh hoạt khi thay đổi kích thước cửa sổ

    plugins: {
      legend: {
        position: "top", // Chú giải (legend) nằm ở phía trên của biểu đồ
        labels: {
          color: "rgba(255, 255, 255, 1)", // Màu chữ trong legend là trắng, để dễ nhìn trên nền tối
          font: {
            size: 14, // Kích thước chữ trong legend
            family: "Arial, sans-serif", // Font chữ
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Màu nền cho tooltip (hiển thị khi hover)
        titleColor: "rgba(255, 255, 255, 1)", // Màu tiêu đề trong tooltip
        bodyColor: "rgba(255, 255, 255, 0.9)", // Màu nội dung tooltip
        borderColor: "rgba(255, 255, 255, 0.2)", // Màu biên của tooltip
        borderWidth: 1, // Độ dày biên của tooltip
      },
    },

    scales: {
      x: {
        type: "category", // Trục X theo loại category (thích hợp cho dữ liệu phân loại)
        title: {
          display: true, // Hiển thị tiêu đề trục X
          text: "Thời gian", // Tiêu đề trục X
          color: "rgba(255, 255, 255, 0.7)", // Màu chữ cho tiêu đề trục X
          font: {
            size: 16, // Kích thước chữ tiêu đề trục X
            family: "Arial, sans-serif", // Font chữ
          },
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)", // Màu của các nhãn trục X
        },
      },
      y: {
        title: {
          display: true, // Hiển thị tiêu đề trục Y
          text: "Cường độ ánh sáng", // Tiêu đề trục Y
          color: "rgba(255, 255, 255, 0.7)", // Màu chữ cho tiêu đề trục Y
          font: {
            size: 16, // Kích thước chữ tiêu đề trục Y
            family: "Arial, sans-serif", // Font chữ
          },
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)", // Màu của các nhãn trục Y
          min: 0, // Giá trị tối thiểu cho trục Y
          max: 100, // Giá trị tối đa cho trục Y
          stepSize: 10, // Kích thước bước (interval) giữa các nhãn trên trục Y
        },
      },
    },

    layout: {
      padding: {
        left: 20, // Khoảng cách bên trái của biểu đồ
        right: 20, // Khoảng cách bên phải
        top: 20, // Khoảng cách trên cùng
        bottom: 20, // Khoảng cách dưới cùng
      },
    },

    elements: {
      line: {
        borderWidth: 2, // Độ dày của đường trong biểu đồ đường (line chart)
        borderColor: "rgba(255, 99, 132, 1)", // Màu của đường
      },
      point: {
        radius: 5, // Kích thước điểm trên biểu đồ
        backgroundColor: "rgba(255, 99, 132, 1)", // Màu nền của điểm
        borderColor: "#fff", // Màu biên của điểm
        borderWidth: 2, // Độ dày biên của điểm
      },
    },
  };

  return (
    <div className="">
      <h1 className="text-3xl font-medium mb-10">Dashboard</h1>

      <div className="grid grid-cols-2 gap-10 ml-6">
        <div className="light-settings flex flex-col max-w-max border-4">
          <h2 className="text-xl font-normal mb-4">
            Điều chỉnh thời gian sáng mặc định cho tất cả các đèn
          </h2>
          <input
            type="number"
            value={defaultTime}
            onChange={handleDefaultTimeChange}
            min={1}
            max={60}
            className="p-4 bg-[hsl(221.74deg_25.84%_17.45%)] rounded-lg text-xl font-weight-bold text-white"
          />
          <p className="mt-5 text-lg font-normal">
            Thời gian mặc định: {defaultTime} phút
          </p>
        </div>

        <div className="light-controls flex-1">
          <h2 className="text-xl font-normal mb-4">Điều khiển đèn</h2>
          {lights.map((light) => {
            return (
              <div
                key={light.id}
                className="flex flex-row gap-x-4 items-center mb-6"
              >
                <h3 className="text-xl font-light text-gray-100">
                  {light.name}
                </h3>

                <button
                  className={`relative inline-flex items-center p-2 rounded-full w-16 h-8 transition-colors duration-300 ease-in-out ${
                    light.status ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() => toggleLight(light.id)}
                >
                  <span
                    className={`absolute top-[2px] left-[2px] transition-transform duration-300 ease-in-out w-7 h-7 rounded-full bg-white transform ${
                      light.status ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>

                <p className="text-lg text-gray-100">
                  Trạng thái của đèn đang:{" "}
                  <p
                    className={light.status ? "text-green-500" : "text-red-500"}
                  >
                    {light.status ? "Bật" : "Tắt"}
                  </p>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-4 m-5 border-2 border-[hsl(221.74deg_25.84%_17.45%)] rounded-lg shadow-sm bg-[hsl(221.74deg_25.84%_12%)] max-w-max">
        <h2 className="text-xl text-white mb-4 text-center">
          Dữ liệu cảm biến ánh sáng
        </h2>
        <Line
          data={chartData}
          options={chartOptions}
          className="max-w-[500px] w-full mx-auto h-[300px]"
        />
      </div>
    </div>
  );
};

export default Dashboard;
