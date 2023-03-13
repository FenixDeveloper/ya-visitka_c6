import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './tooltip.module.css';

const tooltipRoot = document.getElementById('tooltips') as HTMLElement;

interface TooltipProps {
  children: ReactNode;
  offset: { top: number; left: number };
}

function Tooltip(props: TooltipProps) {
  const { children, offset } = props;

  return ReactDOM.createPortal(
    <section
      className={styles.tooltip}
      style={{ top: `${offset.top}px`, right: `${offset.left}px` }}
    >
      {children}
    </section>,
    tooltipRoot,
  );
}

export default Tooltip;
