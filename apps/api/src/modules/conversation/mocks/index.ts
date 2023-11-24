import { Message } from '../types';

import chart2 from './chart-2';
import chart3 from './chart-3';
import markdown1 from './markdown-1';
import markdown2 from './markdown-2';
import markdown3 from './markdown-3';
import table1 from './table-1';

export default [
  //
  markdown1,
  chart2,
  markdown2,
  chart3,
  markdown3,
  table1,
] satisfies Pick<Message, 'contentType' | 'content'>[];
