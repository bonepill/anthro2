import './init';
import './bonepill.css';

import * as echarts from 'echarts';

var mydata = [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ];


var chartDom = document.getElementById('plot');
var myChart = echarts.init(chartDom);
var option;

var bounds = {
  xmin: Math.min(...mydata.map(p => p[0])),
  xmax: Math.max(...mydata.map(p => p[0])),
  ymin: Math.min(...mydata.map(p => p[1])),
  ymax: Math.max(...mydata.map(p => p[1])),
}

function xAxis(min, max, targetTicks = 5) {
  const range = max - min;
  const roughInterval = range / targetTicks;
  const magnitude = Math.pow(10, Math.ceil(Math.log10(roughInterval)) - 1);
  const normalized = roughInterval / magnitude;
  let nice;
  if (normalized <= 2) nice = 2;
  else if (normalized <= 5) nice = 5;
  else nice = 10;

  let line_style = {
	width: 2,
	color: 'black',
  }
  return {
	interval: nice * magnitude,
	min: nice * magnitude * (Math.ceil(min / (nice * magnitude)) - 1),
	max: nice * magnitude * (Math.floor(max / (nice * magnitude)) + 1),
	axisLine: {
	  lineStyle: line_style,
	},
	minorTick: {
      show: true,
	  splitNumber: nice,
	  length: 8,
	  lineStyle: line_style,
    },
    axisTick: {
	  length: 30,
	  lineStyle: line_style,
	},
	axisLabel: {
	  showMinLabel: false,
	  align: 'right',
	  color: 'black',
	  margin: 10,
	  padding: [0, 5],
	  fontWeight: 'bold',
	  fontSize: 20,
	},
  };
}

function yAxis(min, max, targetTicks = 5) {
  const range = max - min;
  const roughInterval = range / targetTicks;
  const magnitude = Math.pow(10, Math.ceil(Math.log10(roughInterval)) - 1);
  const normalized = roughInterval / magnitude;
  let nice;
  if (normalized <= 2) nice = 2;
  else if (normalized <= 5) nice = 5;
  else nice = 10;

  let line_style = {
	color: 'white',
  }
  return {
	interval: nice * magnitude,
	min: nice * magnitude * (Math.ceil(min / (nice * magnitude)) - 1),
	max: nice * magnitude * (Math.floor(max / (nice * magnitude)) + 1),
	minorTick: {
      show: true,
	  splitNumber: nice,
	  length: 4,
	  lineStyle: line_style,
    },
    axisTick: {
	  length: 10,
	  lineStyle: line_style,
	},
	axisLabel: {
	  align: 'right',
	  color: 'white',
	  margin: 15,
	},
  };
}

option = {
  grid: {
	show: true,
	backgroundColor: 'white',
  },
  xAxis: xAxis(bounds.xmin, bounds.xmax, 7),
  yAxis: yAxis(bounds.ymin, bounds.ymax, 7),
  series: [
    {
      symbolSize: 5,
      data: mydata,
      type: 'scatter'
    }
  ],
};

function updateAxisBackground(chart) {
  const rect = chart.getModel()
    .getComponent('grid')
    .coordinateSystem
    .getRect();

  chart.setOption({
    graphic: [{
      id: 'x-axis-background',
      type: 'rect',
      left: rect.x,
      top: rect.y + rect.height,
      shape: {
        width: rect.width,
        height: 30
      },
      style: {
        fill: '#FFEB00'
      },
      silent: true,
      z: 0
    }]
  });
}

option && myChart.setOption(option);
myChart.on('finished', () => {
  updateAxisBackground(myChart);
});
