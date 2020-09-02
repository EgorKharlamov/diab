import React, { useState } from 'react';
import { useUIDSeed } from 'react-uid';
import OutsideClickHandler from 'react-outside-click-handler';
import s from '../../styles/UI/Input.module.sass';

const Input = ({
  type, name, label, value, onChangeInput, disabled,
}: iInput) => {
  const [isFocused, setFocus] = useState(false);
  const seed = useUIDSeed();

  const focusHandler = () => {
    setFocus(true);
  };
  const outsideClickHandler = () => {
    if (!value.trim()) {
      setFocus(false);
    }
  };
  const changeInputHandler = (e:React.FormEvent<HTMLInputElement>) => {
    onChangeInput(e.currentTarget.value);
  };
  return (
    <OutsideClickHandler onOutsideClick={outsideClickHandler} display="inline-block">
      <div className={s.inputContainer} onFocusCapture={focusHandler}>
        <label className={`${s.label} ${isFocused ? s['label--mini'] : ''}`} htmlFor={seed(name)}>
          {label}
        </label>

        <input
          className={s.input}
          type={type}
          name={name}
          id={seed(name)}
          disabled={disabled}
          onChange={changeInputHandler}
        />
      </div>
    </OutsideClickHandler>
  );
};

interface iInput {
  type?: string
  name: string
  label: string
  value: string
  disabled?: boolean
  onChangeInput: (val:string)=>void
}
Input.defaultProps = {
  type: 'text',
  disabled: false,
};

export default Input;
