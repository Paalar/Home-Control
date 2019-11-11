import React, { FunctionComponent } from 'react';

interface Props {
  children: JSX.Element;
  title: string;
  accept: () => void;
  cancel: () => void;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children, title, accept, cancel,
  } = props;
  return (
    <div id="modal-content">
      <h1 className="title">{title}</h1>
      <div>
        {children}
      </div>
      <div id="modal-buttons">
        <button
          type="button"
          id="modal-accept"
          onClick={accept}
        >
          Accept
        </button>
        <button
          type="button"
          id="modal-cancel"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Presentational;
