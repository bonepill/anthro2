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

function axisValues(min, max, targetTicks = 5) {
  const range = max - min;
  const roughInterval = range / targetTicks;
  const magnitude = Math.pow(10, Math.ceil(Math.log10(roughInterval)) - 1);
  const normalized = roughInterval / magnitude;
  let nice;
  if (normalized <= 2) nice = 2;
  else if (normalized <= 5) nice = 5;
  else nice = 10;

  return {
	interval: nice * magnitude,
	min: nice * magnitude * (Math.ceil(min / (nice * magnitude)) - 1),
	max: nice * magnitude * (Math.floor(max / (nice * magnitude)) + 1),
	splitNumber: (nice == 2) ? 4 : 5,
  }
}

let line_style_x = {
  width: 2,
  color: 'black',
};
let axis_values_x = axisValues(bounds.xmin, bounds.xmax, 7);
let axis_values_y = axisValues(bounds.ymin, bounds.ymax, 7);

option = {
  grid: {
	top: 0,
	bottom: 0,
	left: '8%',
	right: '8%',
	show: true,
	backgroundColor: 'white',
  },
  xAxis: {
	interval: axis_values_x.interval,
	min: axis_values_x.min,
	max: axis_values_x.max,
	axisLine: {
	  lineStyle: line_style_x,
	},
	minorTick: {
      show: true,
	  splitNumber: axis_values_x.splitNumber,
	  length: 8,
	  lineStyle: line_style_x,
    },
    axisTick: {
	  length: 30,
	  lineStyle: line_style_x,
	},
	axisLabel: {
	  showMinLabel: false,
	  align: 'right',
	  color: 'black',
	  margin: 10,
	  padding: [0, 3],
	  fontWeight: 'bold',
	  fontSize: 20,
	},
  },
  yAxis: {
	position: 'right',
	interval: axis_values_y.interval,
	min: axis_values_y.min,
	max: axis_values_y.max,
	axisLine: {onZero: false},
    axisTick: {
	  length: 4,
	  lineStyle: {
		color: 'white',
	  },
	},
	axisLabel: {
	  align: 'left',
	  color: 'white',
	},
  },
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
updateAxisBackground(myChart);
/*
myChart.on('finished', () => {
  updateAxisBackground(myChart);
});
*/
