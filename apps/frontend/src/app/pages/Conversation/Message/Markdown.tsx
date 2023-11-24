import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { cn } from '@org/ui-kit';

import 'github-markdown-css';

export interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps): React.ReactElement {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className={cn('markdown-body', className)}>
      {children}
    </ReactMarkdown>
  );
}
