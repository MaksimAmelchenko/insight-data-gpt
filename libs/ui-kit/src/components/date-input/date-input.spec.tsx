import { render } from '@testing-library/react';

import { DateInput } from './date-input';

describe('DateField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateInput dateFormat="date.format.default" value={new Date()} onChange={() => {}} />);
    expect(baseElement).toBeTruthy();
  });
});
