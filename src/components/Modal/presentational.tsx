import React, { FunctionComponent } from 'react';

interface Props {
  children: JSX.Element;
  accept: () => void;
  close: () => void;
}

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { children, accept, close } = props;
  return (
    <div id="modal-content">
      <h1 className="title">Spotify Settings</h1>
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
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Presentational;
