import React, {
  FunctionComponent,
  useCallback,
  useState,
  cloneElement,
} from 'react';
import './overflowingText.scss';

interface Props {
  children: JSX.Element;
  className?: string;
}

const OverflowingText: FunctionComponent<Props> = (props: Props) => {
  const { children, className } = props;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const overflowingChildren = cloneElement(children, { className: 'overflowing' });

  const overflowRef = useCallback((node: HTMLSpanElement) => {
    if (node && node.offsetWidth < node.scrollWidth) {
      setIsOverflowing(true);
    }
  }, []);

  return (
    <span ref={overflowRef} className={`overflowing__wrapper ${className}`} style={{ maxWidth: '100%' }}>
      {isOverflowing ? overflowingChildren : children}
    </span>
  );
};

export default OverflowingText;
