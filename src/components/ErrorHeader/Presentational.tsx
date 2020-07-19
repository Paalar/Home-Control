import React, { FunctionComponent } from 'react';

interface Props {
  errorMessage: string;
}

const Presentational: FunctionComponent<Props> = ({ errorMessage }: Props): JSX.Element => {
  return (
    <div className="error__header">
      <p className="error__message">
        {errorMessage}
      </p>
    </div>
  );
};

export default Presentational;
