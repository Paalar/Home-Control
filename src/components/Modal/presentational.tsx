import React, { FunctionComponent } from 'react';

interface Props {
  children: JSX.Element;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { children } = props;
  return (
    <div id="modal-content">
      {children}
    </div>
  );
};

export default Presentational;
