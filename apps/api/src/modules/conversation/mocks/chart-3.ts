import { ContentType } from '../types';

export default {
  contentType: ContentType.Chart,
  content: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
    },
    series: [
      {
        name: 'Revenue Sources',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
          },
          itemStyle: {
            shadowBlur: 4,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
        data: [
          { value: 1472, name: 'Paid Ads' },
          { value: 800, name: 'Influencer Partnerships' },
          { value: 960, name: 'SmartHome Essentials' },
          { value: 233, name: 'Tech Gadgets' },
        ],
      },
    ],
  },
};
