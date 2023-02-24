import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './tooltip.module.css';

const tooltipRoot = document.getElementById('tooltips') as HTMLElement;

interface TooltipProps {
  children: ReactNode;
}

function Tooltip(props: TooltipProps) {
  const { children } = props;

  return ReactDOM.createPortal(
    <section className={styles.modal}>{children}</section>,
    tooltipRoot,
  );
}

export default Tooltip;
