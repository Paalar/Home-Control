import React, { FunctionComponent } from 'react';

interface Props {
  errorMessage: string;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { errorMessage } = props;
  return (
    <div className="error-header" >
      <p className="error-message">
        {errorMessage}
      </p>
    </div>
  );
};

export default Presentational;
