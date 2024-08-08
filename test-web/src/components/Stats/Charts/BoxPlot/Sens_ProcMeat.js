import ApexCharts from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { statisticSensoryProcessed } from '../../../../API/statistic/statisticSensoryProcessed';

export default function Sens_ProcMeat({
  startDate,
  endDate,
  animalType,
  grade,
}) {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await statisticSensoryProcessed(
        startDate,
        endDate,
        animalType,
        grade
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, animalType, grade]);

  const calculateBoxPlotStatistics = (data) => {
    const sortedData = data.sort((a, b) => a - b);
    const q1Index = Math.floor(sortedData.length / 4);
    const medianIndex = Math.floor(sortedData.length / 2);
    const q3Index = Math.floor((3 * sortedData.length) / 4);

    const q1 = sortedData[q1Index];
    const median = sortedData[medianIndex];
    const q3 = sortedData[q3Index];
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];
    return [min, q1, median, q3, max];
  };

  const chartOptions = {
    chart: {
      type: 'boxPlot',
      height: 350,
    },
    title: {
      text: '처리육 관능데이터 박스 플롯(Box Plot) 분포',
    },
  };

  // Conditionally render the chart only when chartData is not empty
  return (
    <div>
      {chartData && chartData.color && chartData.color.values ? (
        <ApexCharts
          series={[
            {
              type: 'boxPlot',
              data: [
                {
                  x: '색(Color)',
                  y: calculateBoxPlotStatistics(chartData.color.values),
                },
                {
                  x: '마블링(Marbling)',
                  y: calculateBoxPlotStatistics(chartData.marbling.values),
                },
                {
                  x: '기호도(Overall)',
                  y: calculateBoxPlotStatistics(chartData.overall.values),
                },
                {
                  x: '육즙(SurfaceMoisture)',
                  y: calculateBoxPlotStatistics(
                    chartData.surfaceMoisture.values
                  ),
                },
                {
                  x: '조직감(Texture)',
                  y: calculateBoxPlotStatistics(chartData.texture.values),
                },
              ],
            },
          ]}
          options={chartOptions}
          type="boxPlot"
          height={350}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
