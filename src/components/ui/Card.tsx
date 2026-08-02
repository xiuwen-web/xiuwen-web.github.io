import type { ReactNode } from 'react';

/**
 * Two elevation levels, and no more.
 *
 *   flat    surface fill + 1px border. Everything.
 *   raised  adds shadow in light, a hairline lift in dark — shadow does not
 *           read on dark backgrounds. Featured project cards only.
 */
export function Card({
  raised = false,
  as: Tag = 'div',
  id,
  className = '',
  children,
}: {
  raised?: boolean;
  as?: 'div' | 'article' | 'li';
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      id={id}
      className={`rounded-[var(--radius)] border ${className}`}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--rule)',
        boxShadow: raised ? 'var(--shadow-raised)' : undefined,
      }}
    >
      {children}
    </Tag>
  );
}

/** Standard internal padding, so cards do not each invent their own. */
export function CardBody({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
