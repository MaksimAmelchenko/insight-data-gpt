import React, { useRef, useEffect } from 'react';

import { CanvasRenderer } from 'echarts/renderers';
import {
  LegendComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  DataZoomComponent,
} from 'echarts/components';
import { LineChart, BarChart, PieChart} from 'echarts/charts';
import {
  graphic,
  ECharts as EChartsClass,
  ComposeOption,
  SetOptionOpts,
  init,
  getInstanceByDom,
  use,
} from 'echarts/core';

import type { BarSeriesOption, LineSeriesOption, ScatterSeriesOption } from 'echarts/charts';
import type { TitleComponentOption, GridComponentOption } from 'echarts/components';

export type EChartsOption = ComposeOption<
  BarSeriesOption | LineSeriesOption | TitleComponentOption | GridComponentOption | ScatterSeriesOption
>;

export interface ReactEChartsProps {
  option: EChartsOption;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

use([
  LegendComponent,
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

export function ECharts({ option, settings, loading, theme, className }: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: EChartsClass | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener('resize', resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} className={className} />;
}

export { graphic };
