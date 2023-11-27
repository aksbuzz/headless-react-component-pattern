import { HTMLAttributes } from 'react';
import './FadeIn.css'

type FadeInProps = {
  duration?: number;
  delay?: number;
} & HTMLAttributes<HTMLDivElement>;

export function FadeIn(props: FadeInProps) {
  const { duration = 300, delay = 0, children, className, style, ...rest } = props;

  return (
    <div
      {...rest}
      className={`${className || ''} fadeIn`}
      style={{
        ...(style || {}),
        animationDuration: duration + 'ms',
        animationDelay: delay + 'ms',
      }}
    >
      {children}
    </div>
  );
}
