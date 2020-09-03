import React from 'react';

const Button = ({
  type, title, textButton, onClickP,
}:iButton) => {
  const onClickHandler = () => {
    onClickP();
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClickHandler}
    >
      {textButton}
    </button>
  );
};

interface iButton {
  type?: 'button' | 'reset' | 'submit'
  title: string
  textButton: string
  onClickP: ()=>void
}

Button.defaultProps = {
  type: 'button',
};
export default Button;
