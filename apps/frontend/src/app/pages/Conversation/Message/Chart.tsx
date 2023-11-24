import React from 'react';

import { ECharts, EChartsOption } from '../../../components/ECharts/ECharts';
import { cn } from '@org/ui-kit';
import { Loader } from '../../../components/Loader/Loader';

export interface TextProps {
  children: string;
  className?: string;
}

export function Chart({ children, className }: TextProps): React.ReactElement {
  let options;
  try {
    // check if content is a valid JSON or we still waiting for data
    // TODO add Zod validation
    options = JSON.parse(children) as EChartsOption;
  } catch (e) {}

  return (
    <div className={cn('flex h-96 items-center justify-center', className)}>
      {!options ? <Loader className="h-full w-full bg-gray-100 " /> : <ECharts loading={!options} option={options} />}
    </div>
  );
}
