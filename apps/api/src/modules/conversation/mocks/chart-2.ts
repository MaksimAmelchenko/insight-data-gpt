import { ContentType } from '../types';

export default {
  contentType: ContentType.Chart,
  content: {
    title: {
      text: 'Monthly Sales Data',
    },
    grid: {
      left: '80',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['2023', '2022', '2021'],
      padding: 36,
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Sales (in USD)',
        nameLocation: 'center',
        nameTextStyle: {
          padding: [0, 0, 36, 0],
        },
      },
    ],
    series: [
      {
        name: '2023',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series',
        },
        data: [12000, 18000, 15000, 21000, 24000, 22000, 19000, 23000, 25000, 27000, 30000, 32000],
      },
      {
        name: '2022',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [10000, 14000, 12000, 16000, 20000, 18000, 17000, 21000, 23000, 25000, 28000, 29000],
      },
      {
        name: '2021',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [8900, 12730, 11011, 15325, 19186, 17185, 15527, 20145, 22054, 23980, 26698, 27943],
      },
    ],
  },
};
