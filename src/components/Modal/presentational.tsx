import React, { FunctionComponent } from 'react';

interface Props {
  children: JSX.Element
  onAccept: () => void
  onClose: () => void
  title?: string
}

interface ButtonProps {
  children: string
  id: string
  onClick: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, id, children }: ButtonProps) => (
  <button type="button" onClick={onClick} id={id}>
    {children}
  </button>
);

const Presentational: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    title,
    onAccept,
    onClose,
    children,
  } = props;
  return (
    <div id="modal-content">
      <h1 className="title">{title}</h1>
      <div>
        {children}
      </div>
      <div id="modal-buttons">
        <Button id="modal-accept" onClick={onAccept}>
          Accept
        </Button>
        <Button id="modal-cancel" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Presentational;
