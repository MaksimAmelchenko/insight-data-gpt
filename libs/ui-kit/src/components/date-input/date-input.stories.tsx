import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { DateInput, DateInputProps } from './date-input';

export default {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    size: { options: ['sm'], control: { type: 'select' } },
    error: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
  },
} as Meta;

const Template: Story<DateInputProps> = args => {
  const [value, setValue] = useState<Date | null>(new Date());

  return <DateInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  size: 'sm',
  label: 'Date',
  // placeholder: 'Placeholder',
  helperText: 'Helper Text',
};
